const mongoose = require('mongoose');
const { v4 } = require('uuid');
const DrawingAppSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  id: {
    type: Number,
  },
  outLine_img_Url: {
    type: String,
  },
  original_img_Url: {
    type: String,
  },
  time: {
    type: String,
  },
  originalColor: {
    type: Array,
  },
  applyColor: {
    type: Array,
  },
  level: {
    type: Number,
  },
});

const Drawing = mongoose.model('drawing', DrawingAppSchema);

module.exports = {
  Drawing,
};
