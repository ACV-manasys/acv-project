const mongoose = require('mongoose');

const ConveyorSchema = new mongoose.Schema(
  {
    machineName: {
      type: String,
      required: true,
    },
    dimension: {
      type: String,
      required: true,
    },
    quantity: {
      type: Int16Array,
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
        type: Int16Array,
        required: true,
      }
    }],
  }
);

module.exports = mongoose.model('conveyor', ConveyorSchema);
