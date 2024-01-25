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

export default class ProductManager {
  constructor() {
    this.path = "./productos.json";
  }

  getProducts = async (limit) => {
    try {
      if (!fs.existsSync(this.path)) {
        return fs.promises.writeFile(this.path, JSON.stringify([]));
      }
      const products = await fs.promises.readFile(this.path, "utf-8");
      const limitedProducts =
        (await limit) !== undefined
          ? JSON.parse(products).slice(0, limit)
          : JSON.parse(products);
      return limitedProducts;
    } catch (err) {
      return `${err}, Try again`
    }
  };

  addProduct = async (newProduct) => {
    try {
      const productList = await this.getProducts();
      if (!productList) {
        await fs.promises.writeFile(this.path, JSON.stringify([]));
      }
      if (productList?.some((obj) => obj.code === newProduct?.code)) {
        return {
          message: "Product already exist",
          status: 400
        }
      } else if (
        !newProduct?.title ||
        !newProduct?.description ||
        !newProduct?.price ||
        !newProduct?.thumbnail ||
        !newProduct?.code ||
        !newProduct?.stock ||
        !newProduct?.category
      ) {
        return {
          message: "Missing obligatory fields",
          status: 400
        }
      } else {
        // add product
        newProduct.id = generateRandomId(16);
        newProduct.status = true
        productList?.push(newProduct);
        fs.promises.writeFile(this.path, JSON.stringify(productList));
        
        return {
          message: `${newProduct?.title} added successfully`,
          status: 200
        }
      }
    } catch (err) {
      return`${err}, Try again`
    }
  };
  getProductById = async (id) => {
    try {
      const productList = await this.getProducts();
      if (!productList.some((obj) => obj.id === id)) {
        return `product with id '${id}' not found`;
      } else {
        return `Your product is, ${productList.find((obj) => obj.id === id)}`
      }
    } catch (err) {
      return err;
    }
  };
  updateProduct = async (id, newProduct) => {
    try {
      const productList = await this.getProducts();
      if (
        !newProduct?.title ||
        !newProduct?.description ||
        !newProduct?.price ||
        !newProduct?.thumbnail ||
        !newProduct?.code ||
        !newProduct?.stock ||
        !newProduct?.category ||
        !newProduct?.status
      ) {
        return "Missing obligatory fields";
      } else if (productList.some((obj) => obj.id === id)) {
        productList.forEach((obj) => {
          if (obj.id === id) {
            obj.title = newProduct.title;
            obj.description = newProduct.description;
            obj.price = newProduct.price;
            obj.thumbnail = newProduct.thumbnail;
            obj.stock = newProduct.stock;
            obj.category = newProduct.category;
            obj.status = newProduct.status;
          }
          fs.promises.writeFile(this.path, JSON.stringify(productList));
          return `${newProduct?.title} successfully updated`;
        });
      } else {
        return `${newProduct?.title} doesen't exist`;
      }
    } catch (err) {
      return err;
    }
  };
  deleteProduct = async (id) => {
    try {
      let productList = await this.getProducts();
      if (!productList.some((obj) => obj.id === id)) {
        return `product with id '${id}' not found`;
      } else {
        productList = productList.filter((obj) => obj.id !== id);
        fs.promises.writeFile(this.path, JSON.stringify(productList));
        return `product with id '${id}' deleted`;
      }
    } catch (err) {
      return err;
    }
  };
}
