const User = require("../models/user.model");

const getAddressHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { address } = user;
    return res.status(200).json({ address });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get address. Please try again later.",
    });
  }
};

const postAddressHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const address = req.body;
    const updatedAddressArray = [address, ...user.address];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          address: updatedAddressArray,
        },
      },
      { new: true }
    );
    return res.status(200).json({ address: updatedUser.address });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post address. Please try again later.",
    });
  }
};

const deleteAddressHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { addressId } = req.params;
    let addressArray = user.address;

    if (!addressArray.find((addressItem) => addressItem._id === addressId))
      return res.status(400).json({
        message: "Couldn't find address.",
      });

    addressArray = addressArray.filter(
      (addressItem) => addressItem._id !== addressId
    );

    const updatedUser = await User.findByIdAndDelete(
      userId,
      {
        $set: {
          address: addressArray,
        },
      },
      { new: true }
    );
    return res.status(200).json({ address: updatedUser.address });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't delete address. Please try again later.",
    });
  }
};

const updateAddressHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const address = req.body;
    const { addressId } = req.params;

    const updatedAddress = address.map((addressItem) =>
      addressItem._id === addressId ? address : addressItem
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          address: updatedAddress,
        },
      },
      { new: true }
    );
    return res.status(200).json({ address: updatedUser.address });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't update address. Please try again later.",
    });
  }
};
module.exports = {
  getAddressHandler,
  postAddressHandler,
  deleteAddressHandler,
  updateAddressHandler,
};
