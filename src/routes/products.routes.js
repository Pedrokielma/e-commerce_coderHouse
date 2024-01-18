import { Router } from 'express';
import ProductManager from "../models/productManager.js";
const productManager = new ProductManager();

const routerProd = Router();

routerProd.get("/getProducts", async (req, res) => {
    const limit = parseInt(req.query.limit) || undefined;
    // Retrieve products with the specified limit
    let products = await productManager.getProducts(limit);
    res.status(200).send({
      message: limit ? `Product list limited to ${limit} items` : `All products are in the list`,
      data: products,
    });
});

routerProd.get("/getProductById/:id", async (req, res) => {
  let products = await productManager.getProducts();
  let foundProduct = products.find((item) => {
    return item.id == req.params.id;
  });
  if (!foundProduct) {
    return res.status(400).send({
      message: `Product not found`
    });
  } else {
    return res.status(200).send({
      message: `the product You are looking for is ${foundProduct.title}`,
      data: foundProduct,
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
    console.log('epa', response)
    if(!response){
      res.status(400).send({
        message: 'Product not found',
      });
    } else {
      res.status(200).send({
        message: response,
      });

    }
  });

export default routerProd