var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PunSchema = new Schema({
  pun: String,
  tags: String,
  totalStars: Number,
  totalReviews: Number,
  id: Number
});

var Pun = mongoose.model('Pun' , PunSchema);

module.exports = Pun;
