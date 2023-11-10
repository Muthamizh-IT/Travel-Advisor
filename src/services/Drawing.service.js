const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Drawing } = require('../models/Drawing.model');
const moment = require('moment');
const AWS = require('aws-sdk');

const createDrawing = async (req) => {
  const { id } = req.body;
  const s3 = new AWS.S3({
    accessKeyId: 'AKIASTWHV6AFKUYOZZ2J',
    secretAccessKey: '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',
    region: 'ap-south-1',
  });
  let params = {
    Bucket: 'deleciouseapp',
    Key: req.files.outLine_img_Url[0].originalname,
    Body: req.files.outLine_img_Url[0].buffer,
  };

  if (req.files.outLine_img_Url) {
    s3.upload(params, async (err, data) => {
      if (err) {
        console.log('Error uploading');
      } else {
        await Drawing.findByIdAndUpdate({ _id: id }, { outLine_img_Url: data.Location }, { new: true });
      }
    });
  }
  if (req.files.original_img_Url) {
    let params = {
      Bucket: 'deleciouseapp',
      Key: req.files.original_img_Url[0].originalname,
      Body: req.files.original_img_Url[0].buffer,
    };
    s3.upload(params, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        await Drawing.findByIdAndUpdate({ _id: id }, { original_img_Url: data.Location }, { new: true });
      }
    });
  }

  return { message: 'File Uploaded' };
};

const createDrawing_Data = async (body) => {
  let creations = await Drawing.create(body);
  return creations;
};

const getAllDrwaingData = async (query) => {
  let { level } = query;
  level = parseInt(level);
  let levelMatch = { active: true };
  if (level) {
    console.log(level, 'level');
    levelMatch = { level: level };
  }

  let values = await Drawing.aggregate([{ $match: { level: { $eq: level } } }]);
  return values;
};

const updatDraingData = async (id, body) => {
  let values = await Drawing.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not Found');
  }
  values = await Drawing.findByIdAndUpdate({ _id: id }, body, { new: true });
  return values;
};

module.exports = {
  createDrawing,
  createDrawing_Data,
  getAllDrwaingData,
  updatDraingData,
};
