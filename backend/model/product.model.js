import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      rating: Number,
      comment: String,
    },
  ],
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
