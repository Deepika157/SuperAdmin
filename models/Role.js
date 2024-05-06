const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  userid: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    default: null,
  },
  rolename: {
    type: String,
    default: null,
    unique: false,
  },
  lastUpdated: {
    type: String,
    default: null,
  },
  status: {
    type : String,
    default : "",
  },
  description: {
    type: String,
    default: null,
    unique: false,
  },
});

module.exports = mongoose.model('Role', roleSchema);

