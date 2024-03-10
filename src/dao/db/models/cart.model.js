import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  products: {
    type: [{
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1  
      }
    }]
  }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;