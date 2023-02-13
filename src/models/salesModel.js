const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const getSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  return camelize(result);
};

const getSalesProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return camelize(result);
};

const insertSale = async (saleId) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUE (?)',
    [saleId],
  );

  return insertId;
};

const insertSaleProduct = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?);',
    [saleId, productId, quantity],
  );

  return insertId;
};

module.exports = {
  getSales,
  getSalesProducts,
  insertSale,
  insertSaleProduct,
};