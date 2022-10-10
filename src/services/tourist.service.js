const httpStatus = require('http-status');
const { Tourist } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

const createTourist = async (body) => {};

const getAllTourist = async () => {
  let values = await Tourist.find({ active: true });
  return values;
};

const gettouristById = async (id) => {
  let values = await Tourist.findOne({ _id: id, active: true });
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Tourist Found');
  }
  return values;
};

const updateTouristById = async (id, updateBody) => {
  let tourist = await Tourist.findOne({ _id: id, active: true });
  if (!tourist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tourist Not Available');
  }
  tourist = await Tourist.findByIdAndUpdate({ _id: id }, { updateBody }, { new: true });
  return tourist;
};

module.exports = {
  createTourist,
  getAllTourist,
  gettouristById,
  updateTouristById,
};
