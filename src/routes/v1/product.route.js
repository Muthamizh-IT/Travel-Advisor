const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/product.controller');

router.route('/').post(ProductController.createProducts).get(ProductController.getAllProducts);
router.route('/:id').get(ProductController.getproductsById).put(ProductController.updateproductsById);

module.exports = router;
