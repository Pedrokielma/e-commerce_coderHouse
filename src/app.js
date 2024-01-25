import express from "express";
import routerProd from './routes/products.routes.js'
import routerCats from './routes/carts.routes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import  handlebars from 'express-handlebars'
const app = express();

import http from 'http'

const server = http.createServer(app);

//Socket
import { Server } from "socket.io"

const io = new Server(server);

const PORT = 8080;


//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROUTES
app.use('/api/products', routerProd)
app.use('/api/carts', routerCats)

//Public
app.use(express.static(__dirname+'/public'))

//Views
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

let messages = []

//page

app.get('/', (req, res)=>{
  res.render('home', {})
})

//Inicializar el Socket en el servido
io.on('connection', (socket)=>{
  console.log('User conectado')
  //socket.emit('mesagge', 'Hola Cliente, soy el back')
  socket.emit('messages', messages)
  socket.on('new-message', (data)=>{
    console.log(data)
    messages.push(data)
    io.sockets.emit('messages', messages)
  })
})




server.listen(PORT, ()=>{
  console.log('Server running on port 8080')
})