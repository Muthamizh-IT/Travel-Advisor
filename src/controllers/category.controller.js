const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { CategoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const data = await CategoryService.createCategory(req.body);
  res.send(data);
});

const getAllCategory = catchAsync(async (req, res) => {
  const data = await CategoryService.getAllCategory();
  res.send(data);
});

module.exports = {
  createCategory,
  getAllCategory,
};
