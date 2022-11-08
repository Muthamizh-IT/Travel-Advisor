const httpStatus = require('http-status');
const { State } = require('../models');
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
  let states = await State.findOne({ _id: id, active: true });
  if (!states) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Locations Not Available');
  }
  states = await State.findByIdAndUpdate({ _id: id }, { updateBody }, { new: true });
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

module.exports = {
  createState,
  getAllState,
  getStateById,
  updateLocationById,
  getDetailsBy_State,
};
