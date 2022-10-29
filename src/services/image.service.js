const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const image = require('../models/image.upload');

const createImage = async (body) => {
  const create = await image.create(body);
  return create;
};

module.exports = {
  createImage,
};
