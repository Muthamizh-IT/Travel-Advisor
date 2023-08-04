const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Delecious } = require('../models/Delecious.model');
const moment = require('moment');
const AWS = require('aws-sdk');

const ImageUploadService = async (req) => {
  let datas = [];
  const s3 = new AWS.S3({
    accessKeyId: 'AKIASTWHV6AFKUYOZZ2J',
    secretAccessKey: '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',
    region: 'ap-south-1',
  });

  req.files.forEach(async (e) => {
    let params = {
      Bucket: 'deleciouseapp',
      Key: e.originalname,
      Body: e.buffer,
    };
    let name = params.Key.split('.')[0];
    let val = await Delecious.findOne({ Image_Name: name, ImageURL: { $eq: null } });
    console.log(val);
    if (val) {
      s3.upload(params, async (err, data) => {
        datas.push(data.Location);
        val = await Delecious.findOneAndUpdate({ id: val.id }, { ImageURL: data.Location }, { new: true });
      });
    }
  });
};

const filtersBy_KeyWords = async (req) => {
  let key = req.query.keys;

  let values = await Delecious.aggregate([
    {
      $match: { Title: { $regex: key, $options: 'i' } },
    },
  ]);
  return values;
};

module.exports = {
  ImageUploadService,
  filtersBy_KeyWords,
};
