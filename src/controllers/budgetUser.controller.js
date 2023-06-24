const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const BudgetUserService = require('../services/budget.user.service');
const { generateAuthTokens } = require('../services/token.service');
const createUser = catchAsync(async (req, res) => {
  const data = await BudgetUserService.createUser(req.body);
  res.send(data);
});

const Verified = catchAsync(async (req, res) => {
  const data = await BudgetUserService.Verified(req.body);
  res.send(data);
});

const Login = catchAsync(async (req, res) => {
  const data = await BudgetUserService.Login(req.body);
  const token = await generateAuthTokens(data);
  res.send({ users: data, token: token });
});

module.exports = {
  createUser,
  Verified,
  Login,
};
