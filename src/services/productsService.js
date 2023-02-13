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

module.exports = {
  getAllProducts,
  getProductsById,
};