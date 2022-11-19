const express = require('express');
const { saleController } = require('../controllers');
const { validateNewSale } = require('../services/validations/validationsInputValues');

const router = express.Router();

router.post('/', validateNewSale, saleController.createSales);
router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.delete('/:id', saleController.deleteSale);
router.put('/:id', validateNewSale, saleController.updateSale);

module.exports = router;
