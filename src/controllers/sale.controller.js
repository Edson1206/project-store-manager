const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSales = async (req, res) => {
  const { type, message } = await saleService.createSale(req.body);
  
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  return res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const message = await saleService.getAllSales();

  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleService.getSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleService.deleteSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json();
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  deleteSale,
};