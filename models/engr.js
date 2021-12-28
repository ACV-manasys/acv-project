const mongoose = require('mongoose');

const EngrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: false,
    },
    joinedDate: {
      type: Date,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    resp: {
      type: String, // area of responsible
      required: false,
    },
  }
);

module.exports = mongoose.model('engr', EngrSchema);
