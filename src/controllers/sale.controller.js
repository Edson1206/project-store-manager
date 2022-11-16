const { saleModel } = require('../models');

const createSales = async (req, res) => {
  const { body } = req;

  const { message } = await saleModel.insertSales(body);

  return res.status(201).json(message);
};

module.exports = {
  createSales,
};