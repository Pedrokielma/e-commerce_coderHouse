import { Router } from 'express';
import ProductManager from "../models/productManager.js";
const productManager = new ProductManager();

const routerCart = Router();

export default routerCart