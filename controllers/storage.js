// CRUD FOR SPARE PARTS
const Storage = require('../models/storage');
const supporter = require('./supporter');
//const Search = require('./search');

// Create a new Storage ===================================================
exports.create = async (req, res) => {

  const storage = new Storage({
    name: req.body.name,
    quantity: req.body.quantity,
    partNo: req.body.partNo,
    commodity: req.body.commodity,
    specification: req.body.specification,
    manufacturer: req.body.manufacturer,
    note: req.body.manufacturer,
    arrival: req.body.arrival || [],
  });
  // Save this spart to Storage database
  storage
    .save()
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating spare part!',
      });
    });
};

// Update a spart in the storage identified by the spart's Id ==============================
exports.update = (req, res) => {
  supporter.updateData(Storage, req, res);
};

// Delete a spart in the storage with the specified spart's Id ==============================
exports.delete = (req, res) => {
  supporter.deleteData(Storage, req, res);
};

// Retrieve and return all sparts from the storage database =================================
exports.findAll = (req, res) => {
  supporter.findAllData(Storage, req, res);
};

// Find a single spart in the storage with the spart's id ====================================
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  supporter.findData(Storage, req, res);
};

/*
// Searching for spart in the storage given tags
exports.search = (req, res) => {
  Search.spartSearch(req, res);
};*/


