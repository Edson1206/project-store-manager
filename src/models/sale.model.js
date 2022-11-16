const connection = require('./connection');

const insertSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales (date) VALUES
    (NOW())`,
  );
  
  await Promise.all(sales.map(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, ...Object.values(productId, quantity)],
    );
  }));
  
  return insertId;
};

module.exports = {
  insertSales,
};