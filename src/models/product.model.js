const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id',
    [productId],
  );
  return (product);
};

const insert = async (product) => {
  const columns = Object.keys(product)
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const updateProduct = async (id, productName) => {
  const [result] = await connection.execute(
      'UPDATE StoreManager.products SET name= ? WHERE id = ?',
      [productName, id],
    );
    return result;
};

const deleteProduct = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );

  return affectedRows;
};

const searchProduct = async (productName) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products 
    WHERE name LIKE '%${productName}%'`,
    [productName],
  );

  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProduct,
  deleteProduct,
  searchProduct,
};