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

// fetch Top FIve Tourist places

const get_Top_Five_places = catchAsync(async (req, res) => {
  const data = await TouristService.get_Top_Five_places();
  res.send(data);
});

// Fetch Tourist places

const Fetch_placesWith_state = catchAsync(async (req, res) => {
  console.log(req.query)
  const data = await TouristService.Fetch_placesWith_state(req.query.page);
  res.send(data);
});

module.exports = {
  createTourist,
  getAlltourist,
  gettouristById,
  get_Top_Five_places,
  updatetouristById,
  Fetch_placesWith_state,
};
