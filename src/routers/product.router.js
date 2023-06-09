const express = require('express');
const { productController } = require('../controllers');
const validateNewProductFields = require('../middlewares/productValidationMiddleware');

const router = express.Router();

router.get(
  '/',
  productController.listProducts,
);

router.get(
  '/search',
  productController.searchProduct,
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

router.put(
  '/:id',
  validateNewProductFields,
  productController.updateProduct,
);

router.delete(
  '/:id',
  productController.deleteProduct,
);

module.exports = router;