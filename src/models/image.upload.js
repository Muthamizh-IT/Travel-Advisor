const mongoose = require('mongoose');
const { v4 } = require('uuid');

const imageSchema = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  image: {
    type: Array,
  },
  active: {
    type: Boolean,
  },
});

const Image = mongoose.model('image', imageSchema);

module.exports = Image;
