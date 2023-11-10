const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const BudgetUser = require('../models/budgetUser.model');
const bcrypt = require('bcryptjs');

const createUser = async (body) => {
  const findByMobile = await BudgetUser.findOne({ mobileNumber: body.mobileNumber });
  if (findByMobile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Register');
  }
  const creation = await BudgetUser.create({
    userName: body.userName,
    monthlyIncome: body.monthlyIncome,
    mobileNumber: body.mobileNumber,
    Password: body.Password,
  });
  return creation;
};

const Verified = async (body) => {
  const { mobileNumber } = body;
  const findByMobile = await BudgetUser.findOneAndUpdate({ mobileNumber: mobileNumber }, { verified: true }, { new: true });
  return findByMobile;
};

const Login = async (body) => {
  const { mobileNumber, Password } = body;
  const user = await BudgetUser.findOne({ mobileNumber: mobileNumber, verified: true });
  console.log(await user.isPasswordMatch('12345678'));
  if (!user || !(await user.isPasswordMatch(Password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Mobile or password');
  }
  return user;
};

module.exports = {
  createUser,
  Verified,
  Login,
};
