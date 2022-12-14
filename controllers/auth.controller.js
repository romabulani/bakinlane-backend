const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const signupHandler = async (req, res) => {
  try {
    const data = req.body;
    let userFound;
    userFound = await User.findOne({ email: data.email });
    if (userFound)
      return res.status(409).json({ message: "User already exists." });

    let encrptedPassword;
    try {
      encrptedPassword = await bcrypt.hash(data.password, 15);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Signup failed.Please try again later!" });
    }

    const createdUser = new User({
      ...data,
      password: encrptedPassword,
      cart: [],
      orders: [],
      address: [],
      wishlist: [],
    });

    try {
      await createdUser.save();
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Signup failed.Please try again later!" });
    }

    const token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.status(201).json({
      message: "Signup successful",
      user: {
        token,
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        cart: createdUser.cart,
        orders: createdUser.orders,
        address: createdUser.address,
        wishlist: createdUser.wishlist,
      },
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Signup failed.Please try again later!" });
  }
};

const loginHandler = async (req, res) => {
  const data = req.body;
  let userFound;
  try {
    userFound = await User.findOne({ email: data.email });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Login failed.Please try again later!" });
  }
  if (!userFound)
    return res.status(401).json({
      message: "Invalid credentials. Check your username and password.",
    });

  let isPasswordValid = false;
  try {
    isPasswordValid = await bcrypt.compare(data.password, userFound.password);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Login failed.Please try again later!" });
  }
  if (!isPasswordValid)
    return res.status(401).json({
      message: "Invalid credentials. Check your username and password.2",
    });

  const token = jwt.sign(
    { userId: userFound._id, email: userFound.email },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
  return res.status(200).json({
    message: "Login successful",
    user: {
      token,
      _id: userFound._id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      cart: userFound.cart,
      orders: userFound.orders,
      address: userFound.address,
      wishlist: userFound.wishlist,
    },
  });
};

module.exports = { signupHandler, loginHandler };
