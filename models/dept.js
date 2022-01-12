const mongoose = require('mongoose');

const DeptSchema = new mongoose.Schema(
  {
    contractNo: {
      type: String,
      required: true,
    },
    billDate: {
      type: String,
      required: true,
    },
    billNo: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    takeover: {
      type: String,
      required: true,
    },
    machine: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paid: {
      type: Number,
      required: true,
    },
    remaining: {
      type: Number,
      required: true,
    },
    period: [{
      name: {
        type: Number,
        required: false,
      },
      value: {
        type: Number,
        required: false,
      },
    }],
    note: {
      type: String,
      required: false,
    },
  }
);

module.exports = mongoose.model('dept', DeptSchema);
