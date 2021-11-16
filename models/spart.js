const mongoose = require('mongoose');

const SpartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    arrival: [{
      date: {
        type: Date, // this is user's id
        required: false,
      }
    }],
    quantity: {
      type: Int16Array,
      required: true,
    },
    note: {
      type: String,
      required: false,
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
  }
);

module.exports = mongoose.model('spart', SpartSchema);
