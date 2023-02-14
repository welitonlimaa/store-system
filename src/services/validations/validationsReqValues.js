const { idSchema, addProductSchema, saleSchema } = require('./schemas');
const { productsModel } = require('../../models');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });

  if (error) {
    if (error.message.includes('required')) {
      return { type: 'BAD_REQUEST', message: { message: error.message } };
    }

    if (error.message.includes('length')) {
      return { type: 'INVALID_VALUE', message: { message: error.message } };
    }
  }

  return { type: null, message: '' };
};

const validateNewSale = ({ productId, quantity }) => {
  const { error } = saleSchema.validate({ productId, quantity });
  console.log(error);
  if (error) {
    return { type: 'INVALID_VALUE', message: { message: error.message } };
  }

  return { type: null, message: '' };
};

const validateProductId = async (salesData) => {
  const hasProduct = await Promise.all(salesData.map(({ productId }) =>
    productsModel.getById(productId)));

  if (hasProduct.includes(undefined)) {
    return { type: 'NOT_FOUND', message: { message: 'Product not found' } };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
  validateProductId,
};