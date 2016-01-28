var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var app = express();
app.use(parser.urlencoded({
  extended: true
}));
app.use(parser.json());
//add models here

mongoose.connect('mongodb://localhost:27017/pun-database' , function(err){
  if(err) {//If error != undefined
    console.log(err);
  } else {
    console.log("connected to the database!");
  }
});
