// CRUD FOR SPARE PARTS
const SpartStg = require('../models/spartStg');
const Spart = require('../models/spart');
const supporter = require('./supporter');

// Create a new SpartStg ===================================================
exports.create = async (req, res) => {

  if (!req.body.itemId || !req.body.vieName || !req.body.specification) {
    return res.status(400).send({ message: 'Missing spart s details!' });
  }

  const impQ = parseInt(req.body.impQuantity) || 0;
  const expQ = parseInt(req.body.expQuantity) || 0;
  const quan = parseInt(req.body.quantity) || 0;

  const spart = new SpartStg({
    itemId: req.body.itemId,
    vieName: req.body.vieName,
    specification: req.body.specification,
    impQuantity: impQ,
    expQuantity: expQ,
    quantity: quan, // PERIODICAL QUANTITY
    finalExistence: quan + impQ - expQ,
    actionDate: req.body.actionDate || new Date(),
  });
  // Save this SpartStg to database
  spart
    .save()
    .then((data) => {
      // DO UPDATE TO INVENTORY
      Spart.findOne({ _id: data.itemId }).then(async (found) => {
        if (found) {
          found.quantity = found.quantity + data.impQuantity - data.expQuantity;
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
  supporter.findAllByDate(SpartStg, req, res);
};

// Update a SpartStg identified by the SpartStg's Id ==============================
exports.update = (req, res) => {
  supporter.updateData(SpartStg, req, res);
};

// Delete a SpartStg with the specified SpartStg's Id ==============================
exports.delete = (req, res) => {
  supporter.deleteInStorage(SpartStg, Spart, req, res);
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


