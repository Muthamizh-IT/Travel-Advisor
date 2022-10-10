const mongoose = require('mongoose');
const { v4 } = require('uuid');

const LocationsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  state: {
    type: String,
    unique: true,
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
  active: {
    type: Boolean,
    default: true,
  },
  archive: {
    type: false,
  },
});

const Location = new mongoose.model('location', LocationsSchema);

module.exports = Location;
