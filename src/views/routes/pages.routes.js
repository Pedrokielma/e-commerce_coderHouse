import { Router } from 'express';
// import CartsManager from "../models/cartManager.js";
// const cartsManager = new CartsManager();

const routerPages = Router();

routerPages.get('/', (req, res)=>{
    res.render('realTimeProducts', {})
  })
  routerPages.get('/chat', (req, res)=>{
    res.render('chat', {})
  })
  routerPages.get('/:id', (req, res)=>{
    res.render('chat', {})
  })


export default routerPages