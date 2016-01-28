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
