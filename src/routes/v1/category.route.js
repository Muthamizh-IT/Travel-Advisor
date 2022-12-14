const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/category.controller');

router.route('/').post(CategoryController.createCategory).get(CategoryController.getAllCategory);

module.exports = router;
