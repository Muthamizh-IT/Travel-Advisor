const httpStatus = require('http-status');
const { Products } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

// let products = [
//   {
//     name: 'Bandhej',
//     description:
//       'The best place for Bandhani and cotton fabric shopping in Ahmedabad is at Bandhej. Started in 1985 by Archana Shah, Bandhej has become synonymous with sustainable clothing. Its designs are elegant and change with the trends and seasons. Best picks at Bandhej would include kurtas, dupattas and tunic skirts.',
//     image: 'https://cdn.shopify.com/s/files/1/1027/2035/products/5_fad6153f-6343-4c4c-b66e-d8a41764155b.jpg?v=1571438909',
//   },
// ];

// e4fe8ed6-d69f-45c0-b25b-f52dd368e6f2

const createProduct = async () => {
//   products.forEach(async (e) => {
//     await Products.create({
//       locationId: 'b813c8ef-7e7e-4a2a-a318-55bf8de1ec14',
//       stateId: '70e2f42e-7c30-4039-8876-204228e2aa9b',
//       created: moment(),
//       name: e.name,
//       description: e.description,
//       img: e.image,
//       category: e.category,
//     });
//   });
};

const getAllProduct = async () => {
  let products = await Products.find({ active: true });
  return products;
};

const getProductById = async (id) => {
  let products = await Products.findOne({ _id: id, active: true });
  return products;
};

const updateproductsById = async (id, updateBody) => {
  let products = await Products.findOne({ _id: id, active: true });
  if (!products) {
    throw new ApiError(httpStatus.NOT_FOUND, 'products Not Available');
  }
  products = await Products.findByIdAndUpdate({ _id: id }, { updateBody }, { new: true });
  return products;
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateproductsById,
};
