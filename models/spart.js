const mongoose = require('mongoose');

const SpartSchema = new mongoose.Schema(
  {
    partNo: {
      type: String,
      required: true,
    },
    commodity: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
      required: true,
    },
    vieName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
  }
);

module.exports = mongoose.model('spart', SpartSchema);
