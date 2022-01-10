const mongoose = require('mongoose');

const SpartStgSchema = new mongoose.Schema(
  {
    itemId: { //Id of the spart from inventory
      type: String,
      required: true,
    },
    vieName: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
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

module.exports = mongoose.model('spartStg', SpartStgSchema);
