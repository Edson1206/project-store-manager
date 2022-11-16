const { saleModel } = require('../models');

const insertSales = async (sales) => {
  const id = await saleModel.insertSales(sales);

  return { type: null, message: { id, itemsSold: [...sales] } };
};

module.exports = {
  insertSales,
};