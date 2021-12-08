const mongoose = require('mongoose');

const ConvStorageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
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
    manufacturer: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    arrival: [{
      date: {
        type: Date,
        required: false,
      },
      quantity: {
        type: Number,
        required: true,
      }
    }],
  }
);

module.exports = mongoose.model('convStorage', ConvStorageSchema);
