const { idSchema, addProductSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });

  if (error.message.includes('required')) {
    return { type: 'BAD_REQUEST', message: { message: error.message } };
  }

  if (error.message.includes('length')) {
    return { type: 'INVALID_VALUE', message: { message: error.message } };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};