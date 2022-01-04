const mongoose = require('mongoose');

const SpartStgSchema = new mongoose.Schema(
  {
    spartId: { //Id of the spart from inventory
      type: String,
      required: true,
    },
    vieName: {
      type: String,
      required: true,
    },
    spec: {
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
    periodicalExistence: {
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
