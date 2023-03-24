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
  data.save();
  res.send(data);
});

const getDetailsBy_State = catchAsync(async (req, res) => {
  const data = await stateService.getDetailsBy_State(req.params.id);
  res.send(data);
});

const getPopular_States = catchAsync(async (req, res) => {
  const data = await stateService.getPopular_States();
  res.send(data);
});

const getStates_By_Partition = catchAsync(async (req, res) => {
  const data = await stateService.getStates_By_Partition(req.params.id);
  res.send(data);
});

const delete_image = catchAsync(async (req, res) => {
  const data = await stateService.delete_image(req.params.id, req.body);
  res.send(data);
});

module.exports = {
  createStates,
  getAllStates,
  getStateById,
  updatestateById,
  getDetailsBy_State,
  getPopular_States,
  getStates_By_Partition,
  delete_image,
};
