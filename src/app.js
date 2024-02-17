import express from "express";
import Database from "./dao/db/index.js";
import routerProd from "./routes/products.routes.js";
import routerCats from "./routes/carts.routes.js";
import routerPages from "./views/routes/pages.routes.js";
import ProductManager from "./dao/db/managers/productManager.js";
import { fileURLToPath } from "url";
import { dirname } from "path";


const productManager = new ProductManager();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import handlebars from "express-handlebars";
const app = express();

import http from "http";

const server = http.createServer(app);

//Socket
import { Server } from "socket.io";

const io = new Server(server);

const PORT = 8080;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use("/api/products", routerProd);
app.use("/api/carts", routerCats);

//PAGES
app.use("", routerPages);

//Public
app.use(express.static(__dirname + "/public"));

//Views
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");




  

 
  
  //Inicializar el Socket en el servido
  io.on("connection", async (socket) => {
    console.log("User conectado");
    let products = await productManager.getProducts();
    socket.emit("products", products);
  
    socket.on("new-product", (data) => {
      products.push(data);
      io.sockets.emit("products", products);
    });
    socket.on("delete-product", (data) => {
      products = products.filter(obj => obj.id !== data);
      io.sockets.emit("products", products);
    })
  });



server.listen(PORT, () => {
  console.log("Server running on port 8080");
   //Database
Database.connect()
});
