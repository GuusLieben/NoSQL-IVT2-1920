const mongo = require('mongoose');
const Schema = mongo.Schema;

const Review = new Schema({
  text: String,
  rating: {type: Number, required: true, min: 0, max: 5},
  user: Schema.Types.ObjectId
});

// Product Schema
const Product = new Schema({
  name: {type: String, required: true},
  description: String,
  price: {type: Number, required: true, min: 0},
  reviews: [Review],
  average_rating: Number
});

// Virtual property for average_rating
Product.virtual('average_rating').get(function () {
  return this.reviews.isEmpty() ? -1 :
    this.reviews.reduce((prev, curr) => prev.rating + curr.rating)
    / this.reviews.length;
});

// User Schema
const User = new Schema({
  name: {type: String, required: true},
  bought: [{type: Product, ref: 'product', default: []}]
});
