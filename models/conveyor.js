const mongoose = require('mongoose');

const ConveyorSchema = new mongoose.Schema(
  {
    machineName: {
      type: String,
      required: true,
    },
    // DIMENSIONS
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    costIn: {
      type: Number,
      required: false,
    },
    priceOut: {
      type: Number,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
  }
);

module.exports = mongoose.model('conveyor', ConveyorSchema);
