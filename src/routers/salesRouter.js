const express = require('express');

const { salesController } = require('../controllers');

const validateSales = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', validateSales, salesController.createSale);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

module.exports = router;