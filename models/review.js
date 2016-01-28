var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  review: String,
  punID: Number,
  name: String
});

var Review = mongoose.model('Review' , ReviewSchema);

module.exports = Review;
