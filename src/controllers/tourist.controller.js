const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { TouristService } = require('../services');

// create tourist

const createTourist = catchAsync(async (req, res) => {
  const data = await TouristService.createTourist(req.body);
  res.send(data);
});

// Fetch All tourist

const getAlltourist = catchAsync(async (req, res) => {
  const data = await TouristService.getAllTourist();
  res.send(data);
});

// fetch specific tourist By tourist Id

const gettouristById = catchAsync(async (req, res) => {
  const data = await TouristService.gettouristById(req.params.id);
  res.send(data);
});

// update tourist By tourist Id

const updatetouristById = catchAsync(async (req, res) => {
  const data = await TouristService.updateTouristById(req.params.id, req.body);
  res.send(data);
});

module.exports = {
  createTourist,
  getAlltourist,
  gettouristById,
  updatetouristById,
};
