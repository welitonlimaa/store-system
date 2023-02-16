const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s 
      ON sp.sale_id = s.id
      ORDER BY sp.sale_id ASC`,
  );
  return camelize(result);
};

const getById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s 
      ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id ASC;`,
    [saleId],
  );
  return camelize(result);
};

const getSaleById = async (saleId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return camelize(result);
};

const getSalesProducts = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
  return camelize(result);
};

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUE ()',
  );

  return insertId;
};

const insertSaleProduct = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return insertId;
};

const deleteSaleProduct = async (saleId) => connection.execute(
  'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
  [saleId],
);

const deleteSale = async (saleId) => connection.execute(
  'DELETE FROM StoreManager.sales WHERE id = ?',
  [saleId],
);

const updateSale = async (limit, saleId, { productId, quantity }) => connection.execute(
  `UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? 
    WHERE sale_id = ? LIMIT ${limit}`,
  [productId, quantity, saleId],
);

module.exports = {
  getAll,
  getById,
  getSaleById,
  getSalesProducts,
  insertSale,
  insertSaleProduct,
  deleteSale,
  deleteSaleProduct,
  updateSale,
};