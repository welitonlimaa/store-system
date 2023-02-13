const { productsModel } = require('../models');

const schema = require('./validations/validationsReqValues');

const getAllProducts = async () => {
  const result = await productsModel.getAll();
  return { type: null, message: result };
};

const getProductsById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.getById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  // const error = schema.validateNewProduct(name);
  // if (error.type) return error;

  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.getById(newProductId);

  return { message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};