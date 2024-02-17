import ProductModel from '../models/products.model.js';

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
  async getProducts(limit) {
    try {
      const productsQuery = await ProductModel.find();
      if (limit) {
        productsQuery = productsQuery.limit(limit);
      }
      // const products = await productsQuery.exec();
      return productsQuery;
    } catch (err) {
      throw new Error(err.message || 'Failed to get products');
    }
  }

  async addProduct(newProduct) {
    try {
      // Validate required fields
      const { title, description, price, thumbnail, code, stock, category } = newProduct;
      if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
        return { message: 'Missing obligatory fields', status: 400 };
      }

      // Check if product already exists
      const existingProduct = await ProductModel.findOne({ code });
      if (existingProduct) {
        return { message: 'Product already exists', status: 400 };
      }

      // Create new product instance
      const product = new ProductModel({
        ...newProduct,
        id: generateRandomId(16),
        status: true // Set default status
      });

      // Save product to the database
      await product.save();

      return { message: `${newProduct.title} added successfully`, status: 200 };
    } catch (err) {
      throw new Error(err.message || 'Failed to add product');
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id).exec();
      if (!product) {
        return `Product with id '${id}' not found`;
      }
      return product;
    } catch (err) {
      throw new Error(err.message || 'Failed to get product by id');
    }
  }

  async updateProduct(id, newProduct) {
    try {
      // Validate required fields
      const { title, description, price, thumbnail, code, stock, category, status } = newProduct;
      if (!title || !description || !price || !thumbnail || !code || !stock || !category || status === undefined) {
        return 'Missing obligatory fields';
      }

      // Check if product exists
      const existingProduct = await ProductModel.findById(id);
      if (!existingProduct) {
        return `Product with id '${id}' not found`;
      }

      // Update product
      existingProduct.set(newProduct);
      await existingProduct.save();

      return `${newProduct.title} successfully updated`;
    } catch (err) {
      throw new Error(err.message || 'Failed to update product');
    }
  }

  async deleteProduct(id) {
    try {
      // Check if product exists
      const existingProduct = await ProductModel.findOne({ id: id })
      if (!existingProduct) {
        return `Product with id '${id}' not found`;
      }

      // Delete product
      await ProductModel.findOneAndDelete({ id: id });

      return `Product with id '${id}' deleted`;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete product');
    }
  }
}