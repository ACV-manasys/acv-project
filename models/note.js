const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    belongsTo: {
      type: String, // owner of the note
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    visible: {
      type: [String], // people who also see the note
      required: false,
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
