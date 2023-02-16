const camelize = require('camelize');

const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  return camelize(result);
};

const getById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

const getProductsByName = async (name) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE '%${name}%'`,
  );
  return camelize(result);
};

const insert = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  return insertId;
};

const update = async (productId, name) => connection.execute(
  'UPDATE StoreManager.products SET name = ? WHERE id = ?',
  [name, productId],
);

const deleteProduct = async (productId) => connection.execute(
  'DELETE FROM StoreManager.products WHERE id = ?',
  [productId],
);

module.exports = {
  getAll,
  getById,
  getProductsByName,
  insert,
  update,
  deleteProduct,
};