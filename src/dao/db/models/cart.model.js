import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [{
    prodId: {
      type: String,
      required: true,
      unique: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;