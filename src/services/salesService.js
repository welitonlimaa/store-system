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

  await Promise.all(salesData.map(async ({ productId, quantity }) => {
    await salesModel.insertSaleProduct(saleId, productId, quantity);
  }));

  // const createdSale = await salesModel.getSalesProducts(saleId);

  return { type: null, message: { id: saleId, itemsSold: salesData } };
};

const getAllSales = async () => {
  const result = await salesModel.getAll();
  return { type: null, message: result };
};

const getSaleById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await salesModel.getById(saleId);
  if (sale[0] === undefined) return { type: 'NOT_FOUND', message: { message: 'Sale not found' } };

  return { type: null, message: sale };
};

const deleteSale = async (saleId) => {
  const errorId = schema.validateId(saleId);
  if (errorId.type) return errorId;

  const sale = await salesModel.getSaleById(saleId);
  if (!sale) return { type: 'NOT_FOUND', message: { message: 'Sale not found' } };

  await salesModel.deleteSaleProduct(saleId);
  await salesModel.deleteSale(saleId);

  return { type: '', message: { message: '' } };
};

const updateSale = async (id, salesData) => {
  for (let i = 0; i < salesData.length; i += 1) {
    const error = schema.validateNewSale(salesData[i]);
    if (error.type) return error;
  }

  const error = await schema.validateProductId(salesData);
  if (error.type) return error;

  const sale = await salesModel.getSaleById(id);
  if (!sale) return { type: 'NOT_FOUND', message: { message: 'Sale not found' } };

  await salesModel.deleteSaleProduct(id);

  await Promise.all(salesData.map(async ({ productId, quantity }) => {
    await salesModel.insertSaleProduct(id, productId, quantity);
  }));

  return { type: null, message: { saleId: id, itemsUpdated: salesData } };
};

module.exports = {
  createSaleProduct,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};