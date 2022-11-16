const { saleModel, productModel } = require('../models');

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

module.exports = {
  saveSaleProduct,
  createSale,
};