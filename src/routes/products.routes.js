import { Router } from 'express';
import ProductManager from "../dao/db/managers/productManager.js";
const productManager = new ProductManager();

const routerProd = Router();

routerProd.get("/getProducts", async (req, res) => {
  try {
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const sort = req.query.sort || undefined;
      const query = req.query.query ? JSON.parse(req.query.query) : {};

      const products = await productManager.getProducts(limit, page, sort, query);

      res.status(200).send(products);
  } catch (error) {
      res.status(500).send({ status: 'error', message: error.message });
  }
});


routerProd.get("/getProductById/:id", async (req, res) => {
  let product = await productManager.getProductById(req.params.id);
  if (!product) {
    return res.status(400).send({
      message: `Product not found`
    });
  } else {
    return res.status(200).send({
      message: `the product You are looking for is ${product.title}`,
      data: product,
    });
  }
});

routerProd.post("/addProduct", async (req, res) => {
  let response = await productManager.addProduct(req.body);
  res.status(response.status).send({
    message: response.message,
  });
});

routerProd.put("/updateProduct/:id", async (req, res) => {
    let response = await productManager.updateProduct(req.params.id ,req.body);
    res.send({
      message: response,
    });
  });

  routerProd.delete("/deleteProduct/:id", async (req, res) => {
    let response = await productManager.deleteProduct(req.params.id);
      res.status(200).send({
        message: response,
      });
  });

export default routerProd