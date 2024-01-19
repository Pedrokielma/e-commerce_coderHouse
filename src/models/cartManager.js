import fs from "fs";

const generateRandomId = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  Array.from({ length }).forEach(() => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  });
  return randomId;
};

export default class CartsManager {
  constructor() {
    this.path = "./carts.json";
  }

  createCart = async () => {
    try {
    const carts = await fs.promises.readFile(this.path, "utf-8");
    const cartsArray = JSON.parse(carts)
    const newCart = {
        cartId: generateRandomId(32),
        products: []
    }
    cartsArray.push(newCart)
    fs.promises.writeFile(this.path, JSON.stringify(cartsArray));
    return newCart
    } catch (err) {
      return`${err}, Try again`
    }
  };

  addProduct = async (prodId) => {
    try {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsArray = JSON.parse(carts)
        const existingProduct = cartsArray[0].products.find(obj => obj.prodId === prodId);
        if(existingProduct){
            existingProduct.quantity += 1 
           
        } else {
            cartsArray[0].products.push({
                prodId: prodId,
                quantity: 1
            }) 
        } 
        await fs.promises.writeFile(this.path, JSON.stringify(cartsArray));
        return cartsArray[0]       
        } catch (err) {
          return`${err}, Try again`
        }
  } 

  getCartById = async (cartId) => {
    const carts = await fs.promises.readFile(this.path, "utf-8");
    const cartsArray = JSON.parse(carts)
    if (!cartsArray.some((obj) => obj.cartId === cartId)) {
        return `product with id '${cartId}' not found`;
      } else {
        return cartsArray.find(obj => obj.cartId === cartId)
      }
  }

}
