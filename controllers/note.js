// CRUD FOR SPARE PARTS
const Note = require('../models/note');
const supporter = require('./supporter');
//const Search = require('./search');

const themeColor = '#3B7E7E';
// Create a new note ===================================================
exports.create = async (req, res) => {

  var visibleList = req.body.visible;
  visibleList.push(req.user._id);

  const note = new Note({
    visible: visibleList,
    title: req.body.title,
    content: req.body.content,
    color: req.body.color || themeColor,
    tags: req.body.tags || [],
    important: req.body.important || false,
  });
  // Save this note to database
  note
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating note!',
      });
    });
};

// Get all private notes
exports.getPrivate = async (req, res) => {
  // Get all notes that visible list's length is 1
  Note.find({ visible: [req.user._id] }).then((data) => {
    res.status(200).send(data);
  })
    // Catch error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when accessing notes DB!',
      });
    });
};

// Get all shared notes
exports.getShared = async (req, res) => {
  // Get all notes that visible list's greater is greater than 1
  // And the user is accessible to these notes
  Note.find({ visible: req.user._id, "visible.1": { "$exists": true } }).then(async (data) => {
    var noteMap = [];
    for (let i = 0; i < data.length; i++) {
      noteMap.push(await supporter.displayNote(data[i]));
    }
    //console.log(noteMap);
    res.status(200).send(noteMap);
  })
    // Catch error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when accessing notes DB!',
      });
    });
};

exports.changeImportance = (req, res) => {
  const id = req.params.id;

  Note.findById({ _id: id })
    .then(async (note) => {
      if (note) {
        note.important = !note.important;
        await note.save().then((savedData) => {
          res.status(200).send(savedData);
        })
      }
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when updating Data!',
      });
    });
}

// Update a note identified by the note's Id ==============================
exports.update = (req, res) => {
  supporter.updateData(Note, req, res);
};

// Delete a note with the specified note's Id ==============================
exports.delete = (req, res) => {
  supporter.deleteData(Note, req, res);
};

// Retrieve and return all notes from the database =================================
exports.findAll = (req, res) => {
  supporter.findAllData(Note, req, res);
};

// Find a single note with the note's id ====================================
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  supporter.findData(Note, req, res);
};


