const { saleModel, productModel } = require('../models');
const { saleExist } = require('./validations/validationsInputValues');

const saveSaleProduct = (sales, newSale) => sales.map(async ({ productId, quantity }) => {
      await saleModel.insertSaleProduct(newSale, productId, quantity);
    });

const productExist = (sales) => {
  if (sales && sales.length > 0) {
    return sales.map(async ({ productId }) => {
      const product = await productModel.findById(productId);
      if (product) return true;
      return false;
    });
  }
  return [false];
};
    
const createSale = async (sales) => {
  const promisseAll = await Promise.all(productExist(sales));
  if (promisseAll.includes(false)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
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

module.exports = {
  saveSaleProduct,
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
};