const { idSchema, addProductSchema, newSaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewSale = async (req, res, next) => {
  const { error } = newSaleSchema.validate(req.body);
  if (error) {
    if (error.details[0].type === 'any.required') {
      const message = `"${error.details[0].context.key}" is required`;
      return res.status(400).json({ message });
    }
    if (error.details[0].type === 'number.min') {
      const message = `"${error.details[0].context.key}" must be greater than or equal to 1`;
      return res.status(422).json({ message });
    }
  }
  next();
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
};