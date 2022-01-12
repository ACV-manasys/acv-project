// CRUD FOR SPARE PARTS
const ConvStg = require('../models/convStg');
const Conveyor = require('../models/conveyor');
const supporter = require('./supporter');

// Create a new Storage ===================================================
exports.create = async (req, res) => {

  if (!req.body.itemId || !req.body.machineName || !req.body.width || !req.body.height) {
    return res.status(400).send({ message: 'Missing conv s details!' });
  }

  const impQ = parseInt(req.body.impQuantity) || 0;
  const expQ = parseInt(req.body.expQuantity) || 0;
  const quan = parseInt(req.body.quantity) || 0;

  const conv = new ConvStg({
    itemId: req.body.itemId,
    machineName: req.body.machineName,
    width: req.body.width,
    height: req.body.height,
    impQuantity: impQ,
    expQuantity: expQ,
    quantity: quan, // PERIODICAL QUANTITY
    finalExistence: quan + impQ - expQ,
    actionDate: req.body.actionDate || new Date(),
  });
  // Save this ConvStg to database
  conv
    .save()
    .then((data) => {
      // DO UPDATE TO INVENTORY
      Conveyor.findOne({ _id: data.itemId }).then(async (found) => {
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

// Retrieve and return all convs from the database by month =================================
exports.findAllByDate = (req, res) => {
  supporter.findAllByDate(ConvStg, req, res);
};

// Update a ConvStg identified by the ConvStg's Id ==============================
exports.update = (req, res) => {
  supporter.updateData(ConvStg, req, res);
};

// Delete a ConvStg with the specified ConvStg's Id ==============================
exports.delete = (req, res) => {
  supporter.deleteInStorage(ConvStg, Conveyor, req, res);
};


// Retrieve and return all convs from the database =================================
exports.findAll = (req, res) => {
  supporter.findAllData(ConvStg, req, res);
};

// Find a single ConvStg with the ConvStg's id ====================================
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  supporter.findData(ConvStg, req, res);
};


