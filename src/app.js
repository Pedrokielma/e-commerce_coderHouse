import express from "express";
import ProductManager from "./classes/productManager.js";

const app = express();

app.use(express.json());
const PORT = 8080;

const productManager = new ProductManager();

app.get("/getProducts", async (req, res) => {
  let products = await productManager.getProducts();
  res.send({
    message: "All product list ok",
    data: products,
  });
});

app.get("/getProductById/:id", async (req, res) => {
  let products = await productManager.getProducts();
  let foundProduct = products.find((item) => {
    return item.id == req.params.id;
  });
  if (!foundProduct) {
    return "we could not find products with this ID";
  }
  res.send({
    message: `the product You are looking for is ${foundProduct.title}`,
    data: foundProduct,
  });
});

app.post("/addProduct", async (req, res) => {
  let response = productManager.addProduct(req.body);
  res.send({
    message: response,
  });
});

// app.put("/updateProduct", async (req, res) => {
//     let response = productManager.addProduct(req.body);
//     res.send({
//       message: response,
//     });
//   });

app.listen(PORT, () => {
  console.log("server run on port ", PORT);
});
