const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleSchema = Joi.object({
  productId: Joi.number().integer(),
  quantity: Joi.number().integer().min(1),
});

module.exports = {
  idSchema,
  addProductSchema,
  saleSchema,
};