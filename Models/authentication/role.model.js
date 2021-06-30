const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
});

module.exports = mongoose.model('Role', RoleSchema);
