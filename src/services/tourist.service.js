const httpStatus = require('http-status');
const { Tourist } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

const createTourist = async () => {
  // tourist.forEach(async (e) => {
  //   await Tourist.create({
  //     locationId: 'b813c8ef-7e7e-4a2a-a318-55bf8de1ec14',
  //     stateId: '70e2f42e-7c30-4039-8876-204228e2aa9b',
  //     name: e.name,
  //     info: e.info,
  //     img: e.images,
  //     location: e.location,
  //     created: moment(),
  //   });
  // });
  return { message: 'Mooditu podaaaa' };
};

const getAllTourist = async () => {
  let values = await Tourist.find({ active: true });
  return values;
};

const gettouristById = async (id) => {
  let values = await Tourist.findOne({ _id: id, active: true });
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Tourist Found');
  }
  return values;
};

const updateTouristById = async (id, updateBody) => {
  let tourist = await Tourist.findOne({ _id: id, active: true });
  if (!tourist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tourist Not Available');
  }
  tourist = await Tourist.findByIdAndUpdate({ _id: id }, { updateBody }, { new: true });
  return tourist;
};

// fetch Top Five Places

const get_Top_Five_places = async () => {
  const data = await Tourist.aggregate([
    {
      $match: {
        topfive: true,
      },
    },
    {
      $lookup: {
        from: 'states',
        localField: 'stateId',
        foreignField: '_id',
        as: 'State',
      },
    },
    {
      $unwind: '$State',
    },
    {
      $project: {
        _id: 1,
        stateId: 1,
        name: 1,
        info: 1,
        img: 1,
        location: 1,
        topfive: 1,
        StateName: '$State.name',
        StateHistory: '$State.history',
      },
    },
  ]);
  return data;
};

// get places with states

const Fetch_placesWith_state = async (page) => {
  const values = await Tourist.aggregate([
    {
      $lookup: {
        from: 'states',
        localField: 'stateId',
        foreignField: '_id',
        as: 'State',
      },
    },
    {
      $unwind: '$State',
    },
    {
      $project: {
        _id: 1,
        stateId: 1,
        name: 1,
        info: 1,
        img: 1,
        State: '$State.name',
        topfive: 1,
        active:1
      },
    },
    {
      $skip: page * 10,
    },
    { $limit: 10 },
  ]);
  const total = await Tourist.aggregate([
    {
      $lookup: {
        from: 'states',
        localField: 'stateId',
        foreignField: '_id',
        as: 'State',
      },
    },
    {
      $unwind: '$State',
    },
  ]);
  return { values: values, total: total.length };
};

module.exports = {
  createTourist,
  getAllTourist,
  gettouristById,
  updateTouristById,
  get_Top_Five_places,
  Fetch_placesWith_state,
};
