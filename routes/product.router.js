const express = require("express");
const router = express.Router();
const {
  getAllProductsHandler,
  getProductHandler,
  postProductHandler,
} = require("../controllers/product.controller");

router.route("/").get(getAllProductsHandler).post(postProductHandler);

router.get("/:productId", getProductHandler);

module.exports = router;
