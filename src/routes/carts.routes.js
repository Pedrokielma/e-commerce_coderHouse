import { Router } from 'express';
import CartsManager from "../dao/db/managers/cartManager.js";
const cartsManager = new CartsManager();

const routerCarts = Router();


routerCarts.post("/createCart", async (req, res) => {
    let response = await cartsManager.createCart(req.params.cartId);
    res.status(200).send({
      message: `the cart ${response.cartId} was create`,
    });
  });



routerCarts.post("/addProduct/:cartId/:prodId", async (req, res) => {
    let response = await cartsManager.addProduct(req.params.prodId, req.params.cartId);
    res.status(200).send({
      message: response,
    });
  });


  routerCarts.put("/updateProductQuantity/:cartId/:productId", async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;
      const updatedCart = await cartsManager.updateProductQuantity(cartId, productId, quantity);
      res.status(200).send({
        message: `Product ${productId} quantity updated in cart ${cartId} successfully`,
        cart: updatedCart
      });
    } catch (err) {
      res.status(500).send({
        error: err.message || 'Failed to update product quantity in cart'
      });
    }
  });

  
  routerCarts.delete("/deleteProduct/:cartId/:productId", async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const updatedCart = await cartsManager.deleteProductFromCart(cartId, productId);
      res.status(200).send({
        message: `Product ${productId} deleted from cart ${cartId} successfully`,
        cart: updatedCart
      });
    } catch (err) {
      res.status(500).send({
        error: err.message || 'Failed to delete product from cart'
      });
    }
  });

  routerCarts.delete("/deleteAllProducts/:cartId", async (req, res) => {
    try {
      const { cartId } = req.params;
      await cartsManager.deleteAllProductsFromCart(cartId);
      res.status(200).send({
        message: `All products deleted from cart ${cartId} successfully`
      });
    } catch (err) {
      res.status(500).send({
        error: err.message || 'Failed to delete products from cart'
      });
    }
  });
  

  routerCarts.get("/getCartById/:cartId", async (req, res) => {
    let response = await cartsManager.getCartById(req.params.cartId);
   if(response){
       res.status(200).send({
         message: response,
       });
   }else{
    res.status(400).send({
        message: response,
      });
   }
  });


export default routerCarts