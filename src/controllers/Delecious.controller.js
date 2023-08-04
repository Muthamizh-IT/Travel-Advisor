const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const DeleciousService = require('../services/Delecious.service');

const ImageUpload = catchAsync(async (req, res) => {
  const data = await DeleciousService.ImageUploadService(req);
  res.send(data);
});

module.exports = {
  ImageUpload,
};
