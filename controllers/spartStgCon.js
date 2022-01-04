// CRUD FOR SPARE PARTS
const SpartStg = require('../models/spartStg');
const Spart = require('../models/spart');
const supporter = require('./supporter');

// Create a new SpartStg ===================================================
exports.create = async (req, res) => {

  if (!req.body.spartId || !req.body.vieName || !req.body.spec) {
    return res.status(400).send({ message: 'Missing spart s details!' });
  }

  if (!req.body.month || !req.body.year) {
    return res.status(400).send({ message: 'Missing date details!' });
  }

  const spart = new SpartStg({
    spartId: req.body.spartId,
    vieName: req.body.vieName,
    spec: req.body.spec,
    impQuantity: req.body.impQuantity || 0,
    expQuantity: req.body.expQuantity || 0,
    periodicalExistence: req.body.periodicalExistence || 0,
    finalExistence: req.body.finalExistence || 0,
    actionDate: req.body.actionDate,
  });
  // Save this SpartStg to database
  spart
    .save()
    .then((data) => {
      // DO UPDATE TO INVENTORY
      Spart.findOne({ _id: data.spartId }).then(async (found) => {
        if (found) {
          found.quantity = found.quantity + data.impQuantity - expQuantity;
          await found.save();
        }
      });

      // DONE
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating spare part!',
      });
    });
};

// Retrieve and return all sparts from the database by month =================================
exports.findAllByDate = (req, res) => {
  if (!req.body.date) {
    return res.status(400).send({ message: 'Missing date details!' });
  }
  // GET START AND END DATE 
  const date = new Date(req.body.date);
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // Return all data using find()
  SpartStg
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
};

// Update a SpartStg identified by the SpartStg's Id ==============================
exports.update = (req, res) => {
  supporter.updateData(SpartStg, req, res);
};

// Delete a SpartStg with the specified SpartStg's Id ==============================
exports.delete = (req, res) => {
  supporter.deleteData(SpartStg, req, res);
};


// Retrieve and return all sparts from the database =================================
exports.findAll = (req, res) => {
  supporter.findAllData(SpartStg, req, res);
};


// Find a single SpartStg with the SpartStg's id ====================================
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  supporter.findData(SpartStg, req, res);
};


