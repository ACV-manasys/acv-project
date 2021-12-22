// CRUD FOR SPARE PARTS
const Note = require('../models/note');
const supporter = require('./supporter');
//const Search = require('./search');

const themeColor = '#3B7E7E';
// Create a new note ===================================================
exports.create = async (req, res) => {

  const note = new Note({
    belongsTo: req.user._id,
    visible: req.body.visible || [],
    title: req.body.title,
    content: req.body.content || '',
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
  Note.find({ belongsTo: req.user._id, visible: [] }).then((data) => {
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
  Note.find({
    $or:
      [{ belongsTo: req.user._id, "visible.0": { "$exists": true } },
      { visible: req.user._id }]
  }).then(async (data) => {
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
  // Get the id
  const id = req.params.id;

  // Case of updated sucessfully
  Note
    .findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((updatedData) => {
      res.status(200).send(updatedData);
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when updating Data!',
      });
    });
};

// Delete a note with the specified note's Id ==============================
exports.delete = (req, res) => {
  const id = req.params.id;
  Note
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data || data.belongsTo != req.user._id) {
        // If no id found -> return error message
        return res
          .status(404)
          .send({ message: 'No data found or no permission granted to delete this note!' });
      }
      // Else, the data should be deleted successfully
      res.status(200).send({ message: 'Data is deleted successfully!' });
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error accessing the database!' });
    });
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


