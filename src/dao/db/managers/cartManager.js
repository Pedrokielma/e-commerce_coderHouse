import CartModel from '../models/cart.model.js';

export default class CartsManager {


  async createCart() {
    const currentDate = new Date();
    try {
      const newCart = await CartModel.create({ date: currentDate });
      return newCart;
    } catch (err) {
      throw new Error(err.message || 'Failed to create cart');
    }
  }

  async addProduct(prodId, cartId) {
    try {
      const myCart = await CartModel.findOne({ cartId });
      if (!myCart) {
        throw new Error(`Cart with id '${cartId}' not found`);
      }

      const existingProductIndex = myCart.products.findIndex(prod => prod.prodId === prodId);
      if (existingProductIndex !== -1) {
        myCart.products[existingProductIndex].quantity++;
      } else {
        myCart.products.push({ prodId, quantity: 1 });
      }

      await myCart.save();
      return myCart;
    } catch (err) {
      throw new Error(err.message || 'Failed to add product to cart');
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findOne({ cartId });
      if (!cart) {
        throw new Error(`Cart with id '${cartId}' not found`);
      }
      return cart;
    } catch (err) {
      throw new Error(err.message || 'Failed to get cart by id');
    }
  }
}