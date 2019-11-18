const mongo = require('mongoose');
const SchemaMongoDb = mongo.Schema;

const Review = new SchemaMongoDb({
  text: String,
  rating: {type: Number, required: true, min: 0, max: 5},
  user: SchemaMongoDb.Types.ObjectId
});

// Product SchemaMongoDb
const Product = new SchemaMongoDb({
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

// User SchemaMongoDb
const User = new SchemaMongoDb({
  name: {type: String, required: true},
  bought: [{type: Product, ref: 'product', default: []}]
});
