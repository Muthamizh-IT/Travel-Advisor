const httpStatus = require('http-status');
const { Location } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

const createLocation = async (body) => {
  let values = { ...body, ...{ created: moment() } };
  const locations = await Location.create(values);
  return locations;
};

const getAllLocation = async () => {
  let locations = await Location.find({ active: true });
  return locations;
};

const getLocationById = async () => {
  let locations = await Location.findOne({ _id: id, active: true });
  return locations;
};

const updateLocationById = async (id, updateBody) => {
  let locations = await Location.findOne({ _id: id, active: true });
  if (!locations) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Locations Not Available');
  }
  locations = await Location.findByIdAndUpdate({ _id: id }, { updateBody }, { new: true });
  return locations;
};

module.exports = {
  createLocation,
  getAllLocation,
  updateLocationById,
  getLocationById,
};
