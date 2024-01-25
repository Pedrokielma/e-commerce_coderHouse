import { Router } from 'express';
// import CartsManager from "../models/cartManager.js";
// const cartsManager = new CartsManager();

const routerPages = Router();

routerPages.get('/', (req, res)=>{
    res.render('home', {})
  })

  routerPages.get('/realTimeProducts', (req, res)=>{
    res.render('realTimeProducts', {})
  })

export default routerPages