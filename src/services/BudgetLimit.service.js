const { BudgetLimit } = require('../models/budget.App.model');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const createBudgetLimit = async (body) => {
//   const {} = body;
  const creations = await BudgetLimit.create(body);
  return creations;
};

module.exports = {
  createBudgetLimit,
};
