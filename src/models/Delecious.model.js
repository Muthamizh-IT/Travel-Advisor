const mongoose = require('mongoose');

const DeleciousSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  Title: {
    type: String,
  },
  Ingredients: {
    type: String,
  },
  Instructions: {
    type: String,
  },
  Image_Name: {
    type: String,
  },
  Cleaned_Ingredients: {
    type: String,
  },
  ImageURL: {
    Type: String,
  },
});

const Delecious = mongoose.model('delicious', DeleciousSchema);

module.exports = {
  Delecious,
};
