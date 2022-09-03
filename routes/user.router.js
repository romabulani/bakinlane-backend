const express = require("express");
const router = express.Router();

const {
  getCartItemsHandler,
  postItemToCartHandler,
  updateItemInCartHandler,
  clearItemsFromCartHandler,
  deleteItemFromCartHandler,
} = require("../controllers/cart.controller");

const {
  getWishlistItemsHandler,
  postItemToWishlistHandler,
  deleteItemFromWishlistHandler,
} = require("../controllers/wishlist.controller");

const {
  getAddressHandler,
  postAddressHandler,
  deleteAddressHandler,
  updateAddressHandler,
} = require("../controllers/address.controller");

const {
  getAllOrdersHandler,
  postItemToOrdersHandler,
} = require("../controllers/orders.controller");

router.route("/cart").get(getCartItemsHandler).post(postItemToCartHandler);
router
  .route("/cart/:productId")
  .post(updateItemInCartHandler)
  .delete(deleteItemFromCartHandler);
router.route("/cart/clear").get(clearItemsFromCartHandler);

router
  .route("/wishlist")
  .get(getWishlistItemsHandler)
  .post(postItemToWishlistHandler);
router.route("/wishlist/:productId").delete(deleteItemFromWishlistHandler);

router.route("/address").get(getAddressHandler).post(postAddressHandler);
router
  .route("/address/:addressId")
  .post(updateAddressHandler)
  .delete(deleteAddressHandler);

router.route("/orders").get(getAllOrdersHandler).post(postItemToOrdersHandler);

module.exports = router;
