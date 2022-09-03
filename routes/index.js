const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.router");
const categoryRoutes = require("./category.router");
const productRoutes = require("./product.router");
const userRoutes = require("./user.router");
const verifyAuth = require("../middlewares/verifyAuth");

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/users", verifyAuth, userRoutes);

module.exports = router;
