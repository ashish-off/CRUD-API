const express = require('express');
const productController = require('../controllers/product.controller.js')
const router = express.Router();

router.route('/')
    .post(productController.postProduct)
    .get(productController.getProducts)

router.route('/:id')
    .put(productController.putProduct) 
    .get(productController.getProduct)
    .delete(productController.deleteProduct)

module.exports = router;