var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var app = express();
app.use(parser.urlencoded({
  extended: true
}));
app.use(parser.json());

var Pun = require('./models/pun.js');
var Review = require('./models/review.js');

mongoose.connect('mongodb://localhost:27017/pun-database' , function(err){
  if(err) {//If error != undefined
    console.log(err);
  } else {
    console.log("connected to the database!");
  }
});

var port = 8001;

var router = express.Router();

app.get('/pun-database' , function(req , res) {
  res.send({message:"welcome to the api"});
});

app.use('/pun-database' , router);
app.listen(port);
console.log('api active at localhost:' + port);

//submit a new pun
router.post('/newpun' , function(req , res){
  var pun = req.body.pun;
  var tags = req.body.tags;
  var totalStars = 0;
  var totalReviews = 0;
  var highestID;
  Pun.find({}).sort({"id":-1}).limit(1).exec(function(err, result){
    highestID = result[0].id;
    console.log("highest id: " + result[0].id);

    var id;
    if(highestID){
      id = highestID + 1;
    } else {
      id = 1;
    }

    console.log('  ' + id);
    console.log('  ' + pun);
    console.log('  ' + tags);

    Pun.create({'pun':pun,'tags':tags,'totalStars':totalStars,'totalReviews':totalReviews,'id':id} , function(err , result){
      if(err) {
        res.status(500).json({error:"error creating pun"});
        console.log(err);
      }
      res.status(200).json({message:"Pun created" , pun:result});
    });
  });
});

//get a pun based on its id
router.get('/byid' , function(req , res){
  console.log('getting pun by id');
  var id = req.query.id;
  if(id) {
    console.log('finding pun id=' + id);
    Pun.findOne({'id':id} , function(err , result){
      if(err) {
        console.log(err);
        res.status(500);
      } else {
        if(result) {
          res.status(200).json({message:"Pun found" , pun:result});
        } else {
          res.status(404).json({message:"Pun not found"});
        }
      }
    });
  }
});

//gets a random pun
router.get('/random' , function(req , res){
  console.log('getting a random pun');
  var highestID;
  Pun.find({}).sort({"id":-1}).limit(1).exec(function(err, result){
    highestID = result[0].id;
    var x = Math.floor(Math.random()*highestID) + 1;
    Pun.findOne({'id':x} , function(err , result){
      if(err) {
        console.log(err);
        res.status(500);
      } else {
        if(result) {
          res.status(200).json({message:"Pun found" , pun:result});
        } else {
          res.status(404).json({message:"Pun not found"});
        }
      }
    });
  });
});

//get all puns containing a certain tag
router.get('/bytag' , function(req , res){
  console.log('getting puns with ' + req.query.tag + ' tag');
  var tag = req.query.tag;
  var results = [];
  Pun.find({}).sort({'id':1}).exec(function(err , result){
    var hasFinished = false;
    for(var i = 0 ; i < result.length ; i++) {
      if(result[i].tags.indexOf(tag) >= 0) results += result[i];
      if(i==result.length - 1) hasFinished = true;
    }
    do {
      if(hasFinished) {
        if(results.length>0) res.status(200).json({puns:results});
        else res.status(404).json({error:'not found'});
      }
    }while(!hasFinished);
  });
});

//gets the top rated puns
router.get('/best' , function(req , res){
  console.log('getting best puns');
  updateStars();
  Pun.find({}).sort({'stars':-1}).exec(function(err , result) {
    if(err) {
      res.status(500).json({error:'server error'});
    }
    else {
      res.status(200).json({message:'success',puns:result});
    }
  });
});

//gets the worst puns
router.get('/worst' , function(req , res){
  console.log('getting worst puns');
  updateStars();
  Pun.find({}).sort({'stars':1}).exec(function(err , result) {
    if(err) {
      res.status(500).json({error:'server error'});
    }
    else {
      res.status(200).json({message:'success',puns:result});
    }
  });
});

//adds a review
router.post('/review' , function(req , res){
  console.log('creating a review');
  var review = req.body.review;
  var punID = req.body.id;
  var name = req.body.name;
  Review.create({'review':review ,'punID':punID,'name':name} , function(err , result){
    if(err) {
      res.status(500).json({error:"error creating review"});
      console.log(err);
    }
    res.status(200).json({message:"Review created" , review:result});
  });
});

//get all reviews for a certain post
router.get('/readreviews' , function(req , res){
  var id = req.query.id;
  Review.find({"punID":id}).exec(function(err , result){
    res.status(200).json({reviews:result});
  });
});

//vote on a pun
router.put('/vote' , function(req , res){
  console.log('getting a vote: ' + req.body.rating);
  var punID = req.body.id;
  var rating = req.body.rating;
  if(rating > 5) rating = 5;
  Pun.update({id:punID},{$inc:{totalStars:rating,totalReviews:1}} , function(err , result){
    if(err) {
      res.status(500).json({error:"server error"});
    }
    else {
      updateStars();
      res.status(200).json({message:'reveiw subitted'});
    }
  });
});

function updateStars() {
  console.log('updating stars');
  Pun.find({}).exec(function(err , result) {
    for(var i = 0 ; i < result.length ; i++) {
      var thisID = result[i].id;
      var thisStars;
      if(result[i].totalReviews != 0) {
        thisStars = result[i].totalStars / result[i].totalReviews;
        Pun.update({id:thisID},{stars:thisStars},function(err , result) {
          if(err) {
            res.status(500).json({error:"server error"});
            console.log('update stars error 1');
          }
        });
      }
      else {
        Pun.update({id:thisID},{stars:0},function(err , result) {
          if(err) {
            res.status(500).json({error:"server error"});
            console.log('update stars error 2');
          }
        });
      }
    }
  });
}
