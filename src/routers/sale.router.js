const express = require('express');
const { saleController } = require('../controllers');
const validateNewSaleFields = require('../middlewares/saleValidationMiddleware');

const router = express.Router();

router.post('/',
  validateNewSaleFields,
  saleController.createSales);

module.exports = router;
