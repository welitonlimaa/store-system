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
  if (!product) return { type: 'NOT_FOUND', message: { message: 'Product not found' } };

  return { type: null, message: product };
};

const searchProduct = async (name) => {
  const result = await productsModel.getProductsByName(name);
  return { type: null, message: result };
};

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.getById(newProductId);

  return { message: newProduct };
};

const updateProduct = async (productId, name) => {
  const errorId = schema.validateId(productId);
  if (errorId.type) return errorId;
  const errorName = schema.validateNewProduct(name);
  if (errorName.type) return errorName;

  const product = await productsModel.getById(productId);
  if (!product) return { type: 'NOT_FOUND', message: { message: 'Product not found' } };

  await productsModel.update(productId, name);

  const updatedProduct = await productsModel.getById(productId);

  return { message: updatedProduct };
};

const deleteProduct = async (productId) => {
  const errorId = schema.validateId(productId);
  if (errorId.type) return errorId;

  const product = await productsModel.getById(productId);
  if (!product) return { type: 'NOT_FOUND', message: { message: 'Product not found' } };

  await productsModel.deleteProduct(productId);
  return { type: '', message: { message: '' } };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};