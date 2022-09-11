const User = require("../models/user.model");

const getWishlistItemsHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { wishlist } = user;
    return res.status(200).json({ wishlist });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get wishlist items. Please try again later.",
    });
  }
};

const postItemToWishlistHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { product } = req.body;
    const updatedWishlist = [product, ...user.wishlist];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          wishlist: updatedWishlist,
        },
      },
      { new: true }
    );
    return res.status(201).json({ wishlist: updatedUser.wishlist });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post item to wishlist. Please try again later.",
    });
  }
};

const deleteItemFromWishlistHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { productId } = req.params;
    let wishlist = user.wishlist;

    if (!wishlist.find((wishlistItem) => wishlistItem.id === productId))
      return res.status(400).json({
        message: "Couldn't find product in wishlist.",
      });

    wishlist = wishlist.filter((wishlistItem) => wishlistItem.id !== productId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          wishlist: wishlist,
        },
      },
      { new: true }
    );
    return res.status(200).json({ wishlist: updatedUser.wishlist });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't delete item from wishlist. Please try again later.",
    });
  }
};

module.exports = {
  getWishlistItemsHandler,
  postItemToWishlistHandler,
  deleteItemFromWishlistHandler,
};
