const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const BudgetService = require('../services/BudgetLimit.service');
const { date } = require('joi');

const createBudgetLimit = catchAsync(async (req, res) => {
  const data = await BudgetService.createBudgetLimit(req.body);
  res.send(data);
});

module.exports = {
  createBudgetLimit,
};
