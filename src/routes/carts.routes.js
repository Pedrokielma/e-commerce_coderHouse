import { Router } from 'express';
import CartsManager from "../models/cartManager.js";
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