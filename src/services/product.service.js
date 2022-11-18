const { productModel } = require('../models');
const { validateId, validateNewProduct } = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
};

const createProduct = async (name) => {
  const error = validateNewProduct(name);
  if (error.type) return error;

  const newPassengerId = await productModel.insert({ name });
  const newPassenger = await productModel.findById(newPassengerId);

  return { type: null, message: newPassenger };
};

const updateProduct = async (id, productName) => {
  const error = validateNewProduct(productName);
  if (error.type) return error;
  
  await productModel.updateProduct(id, productName);
  const product = await productModel.findById(id);

  if (!product) return ({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

  return { type: null, message: product };
};

const deleteProduct = async (id) => {
  const product = await productModel.deleteProduct(id);

  if (!product) return ({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};