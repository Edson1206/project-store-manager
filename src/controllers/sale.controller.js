const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSales = async (req, res) => {
  const { type, message } = await saleService.createSale(req.body);
  
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(201).json(message);
};

module.exports = {
  createSales,
};