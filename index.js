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
