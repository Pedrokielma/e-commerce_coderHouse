import express from "express";
import routerProd from './routes/products.routes.js'
import routerCats from './routes/carts.routes.js'
const PORT = 8080;

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROUTES
app.use('/api/products', routerProd)
app.use('/api/carts', routerCats)


app.listen(PORT, () => {
  console.log("server run on port ", PORT);
});
