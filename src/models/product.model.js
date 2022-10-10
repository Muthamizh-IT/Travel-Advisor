const mongoose = require('mongoose');
const { v4 } = require('uuid');

// this product schema for famouse products in places
// State Id Is Mandatory

const ProductSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  name: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  category: {
    type: String,
  },
  locationId: {
    type: String,
  },
  stateId: {
    type: String,
  },
  created: {
    type: String,
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

const Products = new mongoose.model('Products', ProductSchema);

module.exports = Products;
