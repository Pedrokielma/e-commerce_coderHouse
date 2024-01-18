import express from "express";
import routerProd from './routes/products.routes.js'
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', routerProd)


app.listen(PORT, () => {
  console.log("server run on port ", PORT);
});
