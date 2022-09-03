const Product = require("../models/product.model");

const getAllProductsHandler = async (req, res) => {
  try {
    let products = [];
    products = await Product.find({});
    return res.status(200).json({ products });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Could not get products. Please try again later." });
  }
};

const getProductHandler = async (req, res) => {
  try {
    const productId = req.params;
    const product = await Product.findById(productId);
    return res.status(200).json({ product });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Could not get product with given ID." });
  }
};

const postProductHandler = async (req, res) => {
  try {
    const data = req.body;
    await Product.insertMany(data);
    const products = await Product.find({});
    return res.status(201).json({ products });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Could not add products. Please try again later." });
  }
};

module.exports = {
  getAllProductsHandler,
  getProductHandler,
  postProductHandler,
};
