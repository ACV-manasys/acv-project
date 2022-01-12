const User = require('../models/user');
const mongoose = require('mongoose');

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

// Retrieve and return all sparts/conv from the database by month =================================
async function findAllByDate(controller, req, res) {
  if (!req.body.date) {
    return res.status(400).send({ message: 'Missing date details!' });
  }
  // GET START AND END DATE 
  const date = new Date(req.body.date);
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // Return all data using find()
  controller
    .find({
      actionDate: {
        $gte: firstDay,
        $lt: lastDay,
      }
    })
    .then((data) => {
      if (data) {
        res.send(data);
      }
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}

// Delete storage item and re-update inventory item
async function deleteInStorage(controller, inventory, req, res) {
  const id = req.params.id;

  await controller.findById(id).then(async (data) => {
    if (!data) {
      // If no id found -> return error message
      return res
        .status(404)
        .send({ message: 'No data found to be deleted!' });
    }

    let itemId = mongoose.Types.ObjectId(data.itemId);
    //console.log(itemId);

    // Search in inventory
    await inventory.findById(itemId).then(async (found) => {
      //console.log(found);
      if (found) {
        found.quantity = found.quantity - data.impQuantity + data.expQuantity;
        //console.log(found);

        await found.save();
      }
    });
  })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error accessing the database!' });
    });

  controller
    .findByIdAndDelete(id)
    .then(() => {
      // Else, the data should be deleted successfully
      res.status(200).send({ message: 'Data is deleted successfully!' });
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error accessing the database!' });
    });
}

module.exports = {
  updateData,
  deleteData,
  findAllData,
  findData,
  displayNote,
  findAllByDate,
  deleteInStorage,
};