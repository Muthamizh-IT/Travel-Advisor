const mongoose = require('mongoose');
const { v4 } = require('uuid');

const StateShema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  locationId: {
    type: String,
  },
  name: {
    type: String,
  },
  capital: {
    type: String,
  },
  about: {
    type: String,
  },
  climate: {
    type: String,
  },
  history: {
    type: String,
  },
  time: {
    type: String,
  },
  food: {
    type: String,
  },
  img: {
    type: Array,
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

const State = new mongoose.model('States', StateShema);

module.exports = State;
