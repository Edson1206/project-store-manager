const { saleModel } = require('../models');
const { saleExist, productExist } = require('./validations/validationsInputValues');

const saveSaleProduct = (sales, newSale) => sales.map(async ({ productId, quantity }) => {
      await saleModel.insertSaleProduct(newSale, productId, quantity);
    });

const createSale = async (sales) => {
  const allIdsValid = await productExist(sales);

  if (!allIdsValid) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const saleId = await saleModel.insertSale();
  await Promise.all(saveSaleProduct(sales, saleId));
  const newSales = {
    id: saleId,
    itemsSold: sales,
  };
  return { type: null, message: newSales };
};

const getAllSales = async () => {
  const result = await saleModel.getAllSales();

  return result;
};

const getSaleById = async (id) => {
  const result = await saleModel.getSaleById(id);

  if (result.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: result };
};

const deleteSale = async (id) => {
  const sale = await saleExist(id);

  if (!sale[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const saleDeleted = await saleModel.deleteSale(id);

  return { type: null, message: saleDeleted };
};

const updateSale = async (id, changes) => {
  const allIdsValid = await productExist(changes);

  if (!allIdsValid) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const findSale = await saleExist(id);

  if (!findSale[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const saleUpdated = changes.map((change) => saleModel.updateSale(id, change));
  await Promise.all(saleUpdated);

  return { type: null, message: { saleId: id, itemsUpdated: changes } };
};

module.exports = {
  saveSaleProduct,
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};