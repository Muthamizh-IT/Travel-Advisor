const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { locationService } = require('../services');

// create locations

const createLocations = catchAsync(async (req, res) => {
  const data = await locationService.createLocation(req.body);
  await data.save();
  res.send(data);
});

// Fetch All Locations

const getAllLocation = catchAsync(async (req, res) => {
  const data = await locationService.getAllLocation();
  res.send(data);
});

// fetch specific location By Location Id

const getLocationById = catchAsync(async (req, res) => {
  const data = await locationService.getLocationById(req.params.id);
  res.send(data);
});

// update Locations By Location Id

const updateLocationById = catchAsync(async (req, res) => {
  const data = await locationService.updateLocationById(req.params.id, req.body);
  res.send(data);
});

module.exports = {
  createLocations,
  getAllLocation,
  getLocationById,
  updateLocationById,
};
