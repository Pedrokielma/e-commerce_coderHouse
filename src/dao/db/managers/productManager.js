import ProductModel from '../models/products.model.js';



export default class ProductManager {
  async getProducts(limit, page, sort, query) {
    try {
      let pipeline = [];

      // Filtro según la consulta
      if (query) {
        pipeline.push({ $match: { category: query } });
      }
  
      // Ordenamiento según el parámetro 'sort'
      if (sort === 'asc' || sort === 'desc') {
        pipeline.push({ $sort: { price: sort === 'asc' ? 1 : -1 } });
      }
  
      // Paginación
      const skip = (page - 1) * limit;
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: limit });

        const products = await ProductModel.aggregate(pipeline);
        console.log('products', products)
        let totalPages = 1;
        let totalProducts = 0;
        if (products.length > 0) {
            totalProducts = products[0].totalProducts;
            totalPages = Math.ceil(totalProducts / limit);
        }

        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        const prevLink = hasPrevPage ? `/api/products/getProducts?page=${page - 1}&limit=${limit}&sort=${sort}&query=${JSON.stringify(query)}` : null;
        const nextLink = hasNextPage ? `/api/products/getProducts?page=${page + 1}&limit=${limit}&sort=${sort}&query=${JSON.stringify(query)}` : null;

        return {
            status: 'success',
            payload: products,
            prevPage: page - 1,
            nextPage: page + 1,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        };
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
      const existingProduct = await ProductModel.findOne({ _id: id })
      if (!existingProduct) {
        return `Product with id '${id}' not found`;
      }

      // Delete product
      await ProductModel.findOneAndDelete({ _id: id });

      return `Product with id '${id}' deleted`;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete product');
    }
  }
}