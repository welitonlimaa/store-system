const { salesModel } = require('../models');
const schema = require('./validations/validationsReqValues');

const createSaleProduct = async (salesData) => {
  for (let i = 0; i < salesData.length; i += 1) {
    const error = schema.validateNewSale(salesData[i]);
    if (error.type) return error;
  }

  const error = await schema.validateProductId(salesData);
  if (error.type) return error;

  const saleId = await salesModel.insertSale();
  await Promise.all(salesData.map(async (data) => {
    const { productId, quantity } = data;
    await salesModel.insertSaleProduct(saleId, productId, quantity);
  }));

  const createdSale = await salesModel.getSalesProducts(saleId);

  return { type: null, message: { id: saleId, itemsSold: createdSale } };
};

module.exports = {
  createSaleProduct,
};