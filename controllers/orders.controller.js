const User = require("../models/user.model");

const getAllOrdersHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { orders } = user;
    return res.status(200).json({ orders });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get orders. Please try again later.",
    });
  }
};

const postItemToOrdersHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { order } = req.body;
    const updatedOrders = [order, ...user.orders];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          orders: updatedOrders,
        },
      },
      { new: true, timestamps: false }
    );
    return res.status(201).json({ orders: updatedUser.orders });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post item to orders. Please try again later.",
    });
  }
};

module.exports = {
  getAllOrdersHandler,
  postItemToOrdersHandler,
};
