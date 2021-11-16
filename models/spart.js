const mongoose = require('mongoose');

const SpartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Int16Array,
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
      }
    }],
  }
);

module.exports = mongoose.model('spart', SpartSchema);
