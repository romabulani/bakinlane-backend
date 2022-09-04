const User = require("../models/user.model");

const getCartItemsHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { cart } = user;
    return res.status(200).json({ cart });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get cart items. Please try again later.",
    });
  }
};

const postItemToCartHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { product } = req.body;
    const updatedCart = [{ ...product, qty: 1 }, ...user.cart];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          cart: updatedCart,
        },
      },
      { new: true }
    );
    return res.status(201).json({ cart: updatedUser.cart });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post item to cart. Please try again later.",
    });
  }
};

const updateItemInCartHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { action } = req.body;
    const { productId } = req.params;
    let cart = user.cart;
    if (!cart.find((cartItem) => cartItem.id === productId))
      return res.status(400).json({
        message: "Couldn't find product in cart.",
      });

    if (action.type === "increment") {
      cart.forEach((cartItem) => {
        if (cartItem.id == productId) {
          cartItem.qty += 1;
        }
      });
    } else if (action.type === "decrement") {
      cart.forEach((cartItem) => {
        if (cartItem.id == productId) {
          cartItem.qty -= 1;
        }
      });
    } else
      return res.status(400).json({
        message: "Invalid action type.",
      });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          cart: cart,
        },
      },
      { new: true }
    );
    return res.status(200).json({ cart: updatedUser.cart });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't update item in cart. Please try again later.",
    });
  }
};

const deleteItemFromCartHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { productId } = req.params;
    const cart = user.cart;

    if (!cart.find((cartItem) => cartItem.id === productId))
      return res.status(400).json({
        message: "Couldn't find product in cart.",
      });

    const updatedCart = cart.filter((cartItem) => cartItem.id !== productId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          cart: updatedCart,
        },
      },
      { new: true }
    );
    return res.status(200).json({ cart: updatedUser.cart });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't delete item from cart. Please try again later.",
    });
  }
};

const clearItemsFromCartHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          cart: [],
        },
      },
      { new: true }
    );
    return res.status(200).json({ cart: updatedUser.cart });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't clear items from cart. Please try again later." + e,
    });
  }
};

module.exports = {
  getCartItemsHandler,
  postItemToCartHandler,
  updateItemInCartHandler,
  deleteItemFromCartHandler,
  clearItemsFromCartHandler,
};
