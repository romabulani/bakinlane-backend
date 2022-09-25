const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    id: String,
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
    qty: Number,
  },
  {
    timestamps: true,
  }
);

const wishlistSchema = Schema(
  {
    id: String,
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
  },
  {
    timestamps: true,
  }
);

const addressSchema = Schema(
  {
    name: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const orderSchema = Schema(
  {
    items: [cartSchema],
    orderDate: Date,
    paymentId: String,
    totalPrice: Number,
    deliveryAddress: addressSchema,
  },
  {
    timestamps: true,
  }
);

const userSchema = Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    cart: [cartSchema],
    wishlist: [wishlistSchema],
    orders: [orderSchema],
    address: [addressSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
