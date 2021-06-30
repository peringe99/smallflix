const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  cat_type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
