const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  userid:{
    type: String,
    default: null,
  },
  couponCode: {
    type: String,
    required: true,
    unique: false,
    default: "",
  },
  discountPercentage: {
    type: Number,
    unique: false,
    required: true,
  },
  lastUpdated: {
    type: String,
    default: null,
  }
});

module.exports = mongoose.model('Coupon', couponSchema);
