const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insertSaleProduct = async (id, productId, quantity) => {
  const [{ result }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, productId, quantity],
  );
  return result;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
    SP.sale_id saleId, 
    S.date, 
    SP.product_id productId, 
    SP.quantity
    FROM StoreManager.sales S
    JOIN StoreManager.sales_products SP
    ON S.id = SP.sale_id
    ORDER BY saleId, productId`,
  );

  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
    S.date, 
    SP.product_id productId, 
    SP.quantity
    FROM StoreManager.sales S
    JOIN StoreManager.sales_products SP 
    ON S.id = SP.sale_id
    WHERE SP.sale_id = ?
    ORDER BY SP.sale_id,
    SP.product_id`,
    [id],
  );

  return result;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return result;
};

const updateSale = async (id, { quantity, productId }) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ?
    AND product_id = ?`,
    [quantity, id, productId],
  );

  return result;
};

module.exports = {
  insertSale,
  insertSaleProduct,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};