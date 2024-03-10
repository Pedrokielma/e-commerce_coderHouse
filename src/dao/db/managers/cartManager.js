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
      const myCart = await CartModel.findById( cartId )

      if (!myCart) {
        throw new Error(`Cart with id '${cartId}' not found`);
      }
      
      const existingProductIndex = myCart.products.findIndex(prod => prod.product._id.toString() === prodId.toString());
      
      if (existingProductIndex !== -1) {
        myCart.products[existingProductIndex].quantity++;
      } else {
              myCart.products.push({
                product: prodId
              })
      }
      await myCart.populate('products.product')
      await myCart.save();
      return myCart;
    } catch (err) {
      throw new Error(err.message || 'Failed to add product to cart');
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const myCart = await CartModel.findById(cartId);
      if (!myCart) {
        throw new Error(`Cart with id '${cartId}' not found`);
      }
      const product = myCart.products.find(prod => prod.product._id.toString() === productId.toString());
      if (!product) {
        throw new Error(`Product with id '${productId}' not found in cart`);
      }
      product.quantity = quantity;
      await myCart.save();
      // Populate the products field before returning
      await myCart.populate('products.product')
      
      return myCart;
    } catch (err) {
      throw new Error(err.message || 'Failed to update product quantity in cart');
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const myCart = await CartModel.findById(cartId);
      if (!myCart) {
        throw new Error(`Cart with id '${cartId}' not found`);
      }
      myCart.products = myCart.products.filter(prod => prod.product._id.toString() !== productId.toString());
      await myCart.save();
      // Populate the products field before returning
      // await myCart.populate('products.product').execPopulate();
      
      return myCart;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete product from cart');
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const myCart = await CartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
      if (!myCart) {
        throw new Error(`Cart with id '${cartId}' not found`);
      }
      return myCart;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete products from cart');
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById( cartId );
      if (!cart) {
        throw new Error(`Cart with id '${cartId}' not found`);
      }
      await cart.populate('products.product')
      return cart;
    } catch (err) {
      throw new Error(err.message || 'Failed to get cart by id');
    }
  }
}