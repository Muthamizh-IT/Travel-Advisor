const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

// create products

const createProducts = catchAsync(async (req, res) => {
  const data = await productService.createProduct();
  res.send(data);
});

// Fetch All products

const getAllProducts = catchAsync(async (req, res) => {
  const data = await productService.getAllProduct();
  res.send(data);
});

// fetch specific products By products Id

const getproductsById = catchAsync(async (req, res) => {
  const data = await productService.getProductById(req.params.id);
  res.send(data);
});

// update products By products Id

const updateproductsById = catchAsync(async (req, res) => {
  const data = await productService.updateproductsById(req.params.id, req.body);
  res.send(data);
});

module.exports = {
  createProducts,
  getAllProducts,
  getproductsById,
  updateproductsById,
};
