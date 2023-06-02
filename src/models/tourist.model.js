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
    type: Array,
    default: [],
  },
  location: {
    type: String,
  },
  topfive: {
    type: Boolean,
    default: false,
  },
  placeCategory: {
    type: String,
  },
  popular: {
    type: Boolean,
    default: false,
  },
  romantic: {
    type: Boolean,
    default: false,
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
  created: {
    type: Date,
  },
  time: {
    type: String,
  },
  language: {
    type: String,
  },
  Rating: {
    type: String,
  },
  hotel_Name: {
    type: String,
  },
  hotel_Image: {
    type: String,
  },
  Like_Count: {
    type: String,
  },
  history: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  specialFood: {
    type: String,
  },
  archive: {
    type: Boolean,
    default: false,
  },
});

const Tourist = new mongoose.model('Tourist', TouristSchema);

module.exports = Tourist;
