const mongoose = require('mongoose');
const { v4 } = require('uuid');

const categoriesSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  Name: {
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
    type: Boolean,
    default: false,
  },
});

const Category = mongoose.model('category', categoriesSchema);

module.exports = Category;
