const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const DrwaingService = require('../services/Drawing.service');

const createDrawing = catchAsync(async (req, res) => {
  const data = await DrwaingService.createDrawing(req);
  res.send(data);
});

const createDrawing_Data = catchAsync(async (req, res) => {
  const data = await DrwaingService.createDrawing_Data(req.body);
  res.send(data);
});

const getAllDrwaingData = catchAsync(async (req, res) => {
  const data = await DrwaingService.getAllDrwaingData(req.query);
  res.send(data);
});

const updatDraingData = catchAsync(async (req, res) => {
  const data = await DrwaingService.updatDraingData(req.params.id, req.body);
  res.send(data);
});

module.exports = {
  createDrawing,
  createDrawing_Data,
  getAllDrwaingData,
  updatDraingData,
};
