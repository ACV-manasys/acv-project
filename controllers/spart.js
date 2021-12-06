// CRUD FOR SPARE PARTS
const Spart = require('../models/spart');
const supporter = require('./supporter');
//const Search = require('./search');

// Create a new spart ===================================================
exports.create = async (req, res) => {

  const spart = new Spart({
    partNo: req.body.partNo,
    commodity: req.body.commodity,
    specification: req.body.specification,
    vieName: req.body.vieName,
    price: req.body.price,
  });
  // Save this spart to database
  spart
    .save()
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating spare part!',
      });
    });
};

// Update a spart identified by the spart's Id ==============================
exports.update = (req, res) => {
  supporter.updateData(Spart, req, res);
};

// Delete a spart with the specified spart's Id ==============================
exports.delete = (req, res) => {
  supporter.deleteData(Spart, req, res);
};

// Retrieve and return all sparts from the database =================================
exports.findAll = (req, res) => {
  supporter.findAllData(Spart, req, res);
};

// Find a single spart with the spart's id ====================================
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  supporter.findData(Spart, req, res);
};


