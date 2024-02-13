import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: String,
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['eletronic', 'kitchen', 'eletrodomestic'],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
