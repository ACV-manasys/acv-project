// CRUD FOR CONVEYOR IN INVENTORY
const Conveyor = require('../models/conveyor');
const supporter = require('./supporter');
//const Search = require('./search');

// Create a new conveyor ===================================================
exports.create = async (req, res) => {

  const conveyor = new Conveyor({
    machineName: req.body.machineName,
    width: req.body.width,
    height: req.body.height,
    costIn: req.body.costIn,
    priceOut: req.body.priceOut,
    quantity: req.body.quantity || 0,
  });
  // Save this conveyor to database
  conveyor
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating conveyor!',
      });
    });
};

// Update a conveyor identified by the conveyor's Id ==============================
exports.update = (req, res) => {
  supporter.updateData(Conveyor, req, res);
};

// Delete a conveyor with the specified conveyor's Id ==============================
exports.delete = (req, res) => {
  supporter.deleteData(Conveyor, req, res);
};

// Retrieve and return all conveyors from the database =================================
exports.findAll = (req, res) => {
  supporter.findAllData(Conveyor, req, res);
};

// Find a single conveyor with the conveyor's id ====================================
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  supporter.findData(Conveyor, req, res);
};

/*
// Searching for conveyor given tags
exports.search = (req, res) => {
  Search.conveyorSearch(req, res);
};*/


