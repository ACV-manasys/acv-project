// CRUD FOR ENGINEERS
const Engr = require('../models/engr');
const supporter = require('./supporter');

// Create a new engr ===================================================
exports.create = async (req, res) => {

  const engr = new Engr({
    name: req.body.name,
    dob: req.body.dob || null,
    joinedDate: req.body.joinedDate || null,
    phoneNumber: req.body.phoneNumber || '',
    email: req.body.email || '',
    resp: req.body.resp || '',
  });
  // Save this engr to database
  engr
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating engr!',
      });
    });
};

// Update a spart identified by the spart's Id ==============================
exports.update = (req, res) => {
  supporter.updateData(Engr, req, res);
};

// Delete a log with the specified engr's Id ==============================
exports.delete = (req, res) => {
  supporter.deleteData(Engr, req, res);
};

// Retrieve and return all Engrs from the database =================================
exports.findAll = (req, res) => {
  supporter.findAllData(Engr, req, res);
};

// Find a single Engr with the Engr's id ====================================
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  supporter.findData(Engr, req, res);
};


