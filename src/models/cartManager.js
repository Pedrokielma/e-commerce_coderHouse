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

  addProduct = async (cartId, prodId) => {
    try {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const myCart = JSON.parse(carts).find(obj => obj.cartId === cartId);
        if(myCart.products.find(obj => obj.pordId === prodId)){
            myCart.products[prodId].quantity + 1 
            return fs.promises.writeFile(this.path, JSON.stringify(myCart));
        } else {
            myCart.products.push({
                prodId: prodId,
                quantity: 1
            }) 
            return fs.promises.writeFile(this.path, JSON.stringify(myCart));
        }
        
        
        } catch (err) {
          return`${err}, Try again`
        }
  } 


}
