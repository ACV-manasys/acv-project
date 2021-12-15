const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    visible: {
      type: [String], // people who can see the note
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    important: {
      type: Boolean,
      required: false,
    },
  }
);

module.exports = mongoose.model('note', NoteSchema);
