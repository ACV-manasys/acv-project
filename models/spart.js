const mongoose = require('mongoose');

const SpartSchema = new mongoose.Schema(
  {
    partNo: {
      type: String,
      required: false,
    },
    commodity: {
      type: String,
      required: false,
    },
    specification: {
      type: String,
      required: false,
    },
    vieName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    }
  }
);

module.exports = mongoose.model('spart', SpartSchema);
