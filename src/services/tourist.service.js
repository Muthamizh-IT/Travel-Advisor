const httpStatus = require('http-status');
const { Tourist, State } = require('../models');
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
  let state = await State.findById(values.stateId);
  let data = {
    name: values.name,
    topfive: values.topfive,
    popular: values.popular,
    active: values.active,
    archive: values.archive,
    locationId: values.locationId,
    stateId: values.stateId,
    info: values.info,
    img: values.img,
    location: values.location,
    created: values.created,
    stateName: state.name,
    lat: values.lat,
    long: values.long,
    time: values.time,
    history: values.history,
    language: values.language,
    specialFood: values.specialFood,
    category: values.placeCategory,
  };
  return data;
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

const Fetch_placesWith_state = async (page, name) => {
  let nameMatch = { active: true };
  if (name) {
    nameMatch = { name: { $regex: name, $options: 'i' } };
  }
  const values = await Tourist.aggregate([
    {
      $sort: { created: -1 },
    },
    {
      $match: { $and: [nameMatch] },
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
        State: '$State.name',
        topfive: { $ifNull: ['$topfive', false] },
        active: 1,
        lat: 1,
        long: 1,
        placeCategory: 1,
      },
    },
    {
      $skip: 10 * page,
    },
    { $limit: 10 },
  ]);
  const total = await Tourist.aggregate([
    {
      $match: { $and: [nameMatch] },
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

const delete_image = async (id, body) => {
  let values = await Tourist.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Place Not Found');
  }
  values = await Tourist.findByIdAndUpdate({ _id: id }, { $pull: { img: body.image } }, { new: true });
  return values;
};

const Upload_Image = async (id, body) => {
  let values = await Tourist.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Place Not Found');
  }
  values = await Tourist.findByIdAndUpdate({ _id: id }, { $push: { img: body.image } }, { new: true });
  return values;
};

const getCategories_ByStates = async (id) => {
  let Temples = await Tourist.aggregate([{
    $match: {
      stateId: id,
      placeCategory: { $in: ['temples'] }
    }
  }])

  let natiral_hills = await Tourist.aggregate([{
    $match: {
      stateId: id,
      placeCategory: { $in: ['hills', 'caves', 'natural', 'mangrove forest'] }
    }
  }])

  let others = await Tourist.aggregate([{
    $match: {
      stateId: id,
      placeCategory: { $nin: ['temples', 'hills', 'caves', 'natural', 'mangrove forest'] }
    }
  }])

  return {
    Temples: Temples,
    natural_hills: natiral_hills,
    others: others
  }

}


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
  delete_image,
  Upload_Image,
  getCategories_ByStates
};
