const { salesModel } = require('../models');

const createSaleProduct = async (salesData) => {
  const [result] = await salesModel.getSales();
  const id = result.length - 1;
  const saleId = await salesModel.insertSale(id);
  salesData.map(async (data) => {
    const { productId, quantity } = data;
    await salesModel.insertSaleProduct(saleId, productId, quantity);
  });

  return { type: null, message: 'okay' };
};

module.exports = {
  createSaleProduct,
};