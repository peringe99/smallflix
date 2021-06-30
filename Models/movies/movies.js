const mongoose = require("mongoose");
let movieModels = {};

// Declare the Schema of the Mongo model
const MovieSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
  },
  backdrop_path: {
    type: String,
  },
  genre_ids: [Number],
  id: {
    type: Number,
  },
  original_language: {
    type: String,
  },
  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  poster_path: {
    type: String,
  },
  release_date: {
    type: String,
  },
  title: {
    type: String,
  },
  origin_country: [],
  original_name: {
    type: String,
  },
  name: {
    type: String,
  },
  video: {
    type: Boolean,
  },
  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

});

module.exports = mongoose.model('Movie', MovieSchema);
