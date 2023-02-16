const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductsById(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateProduct(id, name);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(204).end();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsService.searchProduct(q);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};