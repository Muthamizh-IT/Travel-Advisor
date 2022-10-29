const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const imageService = require('../services/image.service');

const createimage = catchAsync(async (req, res) => {
  const data = await imageService.createImage(req.body);
  //   console.log(data)
  if (req.files) {
    console.log(req.files)
    if (req.files.image != 'null') {
      req.files.forEach((e) => {
        data.image.push('images/' + e.filename);
      });
    }
  }
  res.send(data);
  await data.save();
});

module.exports = {
  createimage,
};
