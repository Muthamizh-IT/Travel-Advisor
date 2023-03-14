const httpStatus = require('http-status');
const { Tourist } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

const createTourist = async (body) => {
  let values = { ...body, ...{ created: moment() } };
  const data = await Tourist.create(values);
  return data;
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
  tourist = await Tourist.findByIdAndUpdate({ _id: id }, updateBody, { new: true });
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
  let value = await Tourist.aggregate([
    {
      $match: {
        placeCategory: 'hills',
        popular: true,
      },
    },
  ]);
  return { topFive: data, popularHills: value };
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
        topfive: { $ifNull: ['$topfive', false] },
        active: 1,
        lat: 1,
        long: 1,
      },
    },
    {
      $sort: { topfive: -1 },
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

const UpdateTopFivePlaces = async (id, body) => {
  let values = await Tourist.findById(id);
  let topfive = await Tourist.find({ topfive: true });
  let len = topfive.length;
  if (len >= 5) {
    throw new ApiError(httpStatus, 'Already Five Places in Top');
  }
  if (!values) {
    throw new ApiError(httpStatus, 'Place Not Found');
  }
  values = await Tourist.findByIdAndUpdate({ _id: id }, body, { new: true });
  return values;
};

const getPopular_RomanticPlace = async () => {
  const data = await Tourist.find({ romantic: true });
  return data;
};

const getPlaces_By_State = async (id) => {
  let values = await Tourist.aggregate([
    {
      $match: {
        stateId: id,
      },
    },
  ]);
  return values;
};

module.exports = {
  createTourist,
  getAllTourist,
  gettouristById,
  updateTouristById,
  get_Top_Five_places,
  Fetch_placesWith_state,
  UpdateTopFivePlaces,
  getPopular_RomanticPlace,
  getPlaces_By_State,
};
