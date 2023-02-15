const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const dataSale = req.body;

  const { type, message } = await salesService.createSaleProduct(dataSale);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(204).end();
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
};