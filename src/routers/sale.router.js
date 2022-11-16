const express = require('express');
const { saleController } = require('../controllers');
const { validateNewSale } = require('../services/validations/validationsInputValues');

const router = express.Router();

router.post('/', validateNewSale, saleController.createSales);
router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);

module.exports = router;
