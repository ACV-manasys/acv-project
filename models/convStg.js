const mongoose = require('mongoose');

const ConvStgSchema = new mongoose.Schema(
  {
    itemId: { //Id of the conv from inventory
      type: String,
      required: true,
    },
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
    impQuantity: {
      type: Number,
      required: true,
    },
    expQuantity: {
      type: Number,
      required: true,
    },
    quantity: { // periodical quantity
      type: Number,
      required: true,
    },
    finalExistence: {
      type: Number,
      required: true,
    },
    actionDate: {
      type: Date,
      required: true,
    },
  }
);

module.exports = mongoose.model('convStg', ConvStgSchema);
