const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Category } = require('../models');
const moment = require('moment');

const createCategory = async (body) => {
  let values = { ...body, ...{ created: moment() } };
  const categories = Category.create(values);
  return categories;
};

// Fetch All Category

const getAllCategory = async () => {
  const values = await Category.find();
  return values;
};

module.exports = {
  createCategory,
  getAllCategory,
};
