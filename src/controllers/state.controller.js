const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { stateService } = require('../services');

// create states

const createStates = catchAsync(async (req, res) => {
  const data = await stateService.createState(req.body);
  await data.save();
  res.send(data);
});

// Fetch All states

const getAllStates = catchAsync(async (req, res) => {
  const data = await stateService.getAllState();
  res.send(data);
});

// fetch specific state By Location Id

const getStateById = catchAsync(async (req, res) => {
  const data = await stateService.getStateById(req.params.id);
  res.send(data);
});

// update state By Location Id

const updatestateById = catchAsync(async (req, res) => {
  const data = await stateService.updateLocationById(req.params.id, req.body);
  res.send(data);
});

const getDetailsBy_State = catchAsync(async (req, res) => {
  const data = await stateService.getDetailsBy_State(req.params.id);
  res.send(data);
});

module.exports = {
  createStates,
  getAllStates,
  getStateById,
  updatestateById,
  getDetailsBy_State,
};
