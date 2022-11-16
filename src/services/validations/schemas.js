const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleItemSchema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1).required(),
});

const newSaleSchema = Joi.array().items(saleItemSchema);

module.exports = {
  idSchema,
  addProductSchema,
  newSaleSchema,
};