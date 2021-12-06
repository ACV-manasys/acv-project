// MODEL FOR HISTORY LOG DB
const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    user: {
      type: String, // NAME OF USER WHO PERFORMED THE ACTION
      required: true,
    },
    activity: {
      type: String, // CODE OF ACTIVITY
      required: true,
    },
  }, {
  timestamps: true // TIME OF CREATING LOG
});

module.exports = mongoose.model('log', LogSchema);
