const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  _id: String,
  title: String,
  imageUrl: String,
  rating: String,
  totalRatings: Number,
  price: String,
  categoryName: String,
  isOutOfStock: Boolean,
  offerPercentage: Number,
  item: String,
  weight: String,
  isBestSeller: Boolean,
  priceCategory: String,
});

module.exports = mongoose.model("Product", productSchema);
