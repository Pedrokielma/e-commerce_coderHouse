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


routerCarts.post("/addProduct/:cartId", async (req, res) => {
    let response = await cartsManager.addProduct(req.params.cartId);
    console.log(response)
    // res.status(response.status).send({
    //   message: response.message,
    // });
  });

export default routerCarts