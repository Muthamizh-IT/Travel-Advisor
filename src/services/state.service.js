const httpStatus = require('http-status');
const { State, Category } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

const createState = async (body) => {
  let values = { ...body, ...{ created: moment() } };
  const statecreate = await State.create(values);
  return statecreate;
};

const getAllState = async () => {
  let values = await State.find({ active: true });
  return values;
};

const getStateById = async (id) => {
  let values = await State.findOne({ _id: id, active: true });
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No state Found');
  }
  return values;
};

const updateLocationById = async (id, updateBody) => {
  console.log(updateBody);
  let states = await State.findOne({ _id: id, active: true });
  console.log(states);
  if (!states) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Locations Not Available');
  }
  states = await State.findByIdAndUpdate({ _id: id }, updateBody, { new: true });
  return states;
};

const getDetailsBy_State = async (id) => {
  let values = await State.aggregate([
    {
      $match: { _id: id },
    },
    {
      $lookup: {
        from: 'tourists',
        localField: '_id',
        foreignField: 'stateId',
        as: 'touristplaces',
      },
    },
  ]);
  return values;
};

const getPopular_States = async () => {
  const data = await State.find().limit(9);
  return data;
};

// fetch state By Partition

const getStates_By_Partition = async (id) => {
  const data = await State.aggregate([
    {
      $match: {
        locationId: id,
      },
    },
  ]);
  const partitions = await Category.findOne({ _id: id });
  return { data: data, partitions: partitions };
};

const delete_image = async (id, body) => {
  let data = await State.findById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'State Not Found');
  }
  data = await State.updateOne({ _id: id }, { $pull: { img: body.image } }, { new: true });
  return { mssage: 'Image Deleted.....' };
};

module.exports = {
  createState,
  getAllState,
  getStateById,
  updateLocationById,
  getDetailsBy_State,
  getPopular_States,
  getStates_By_Partition,
  delete_image,
};
