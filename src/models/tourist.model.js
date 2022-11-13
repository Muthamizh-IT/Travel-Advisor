const mongoose = require('mongoose');
const { v4 } = require('uuid');

// place Id, stateId and products Id mandatory

const TouristSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  placeId: {
    type: String,
  },
  locationId: {
    type: String,
  },
  stateId: {
    type: String,
  },
  name: {
    type: String,
  },
  info: {
    type: String,
  },
  img: {
    type: String,
  },
  location: {
    type: String,
  },
  topfive: {
    type: Boolean,
    default: false,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  created: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  archive: {
    type: Boolean,
    default: false,
  },
});

const Tourist = new mongoose.model('Tourist', TouristSchema);

module.exports = Tourist;
