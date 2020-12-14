const { string } = require('joi');
const mongoose = require('mongoose');

const movieStockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const MovieStock = mongoose.model('Movie In Stock', movieStockSchema);

module.exports.MovieStock = MovieStock;
