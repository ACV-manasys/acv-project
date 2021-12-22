const User = require('../models/user');

// Update a data identified by the data's Id =====================================
function updateData(controller, req, res) {
  // Get the id
  const id = req.params.id;

  // Case of updated sucessfully
  controller
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
}

// Delete a data with the specified data's Id ====================================
function deleteData(controller, req, res) {
  const id = req.params.id;
  controller
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        // If no id found -> return error message
        return res
          .status(404)
          .send({ message: 'No data found to be deleted!' });
      }
      // Else, the data should be deleted successfully
      res.status(200).send({ message: 'Data is deleted successfully!' });
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error accessing the database!' });
    });
}

// Retrieve and return all data from the database =================================
function findAllData(controller, req, res) {
  // Return all data using find()
  controller
    .find()
    .then((data) => {
      res.send(data);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}

// Retrieve and return data given the id =========================================
function findData(controller, req, res) {
  const id = req.params.id;
  // Return all data using findOne()
  controller
    .findOne(id)
    .then((data) => {
      res.send(data);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}

// Get names from list of ids
async function getNames(idList) {
  var names = [];
  for (var i = 0; i < idList.length; i++) {
    const id = idList[i];
    await User.findOne({ _id: id })
      .then((found) => {
        if (found) {
          names.push(found.name);
        }
      })
      .catch((err) => {
        console.log(err);
        // do nothing --> checks for length of participant list will give error for us
      });
  }
  return names;
}

async function displayNote(note) {
  return {
    _id: note._id,
    belongsTo: note.belongsTo,
    visible: note.visible,
    title: note.title,
    content: note.content,
    color: note.color,
    tags: note.tags,
    important: note.important,
    names: await getNames(note.visible),
  };
}

module.exports = {
  updateData,
  deleteData,
  findAllData,
  findData,
  displayNote,
};