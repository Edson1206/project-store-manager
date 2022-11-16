const express = require('express');
const { productController } = require('../controllers');
const validateNewProductFields = require('../middlewares/productValidationMiddleware');

const router = express.Router();

router.get(
  '/',
  productController.listProducts,
);

router.get(
  '/:id',
  productController.getProduct,
);

router.post(
  '/',
  validateNewProductFields,
  productController.createProduct,
);

module.exports = router;