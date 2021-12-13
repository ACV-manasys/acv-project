// CONTROLLER FOR HISTORY LOG DB
const Log = require('../models/log');
const supporter = require('./supporter');
const Search = require('./search');

// Create a new log ===================================================
exports.create = async (req, res) => {

  const log = new Log({
    user: req.user.name,
    activity: req.body.activity,
    code: req.body.code,
  });
  // Save this log to database
  log
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when creating log!',
      });
    });
};

// Delete a log with the specified log's Id ==============================
exports.delete = (req, res) => {
  supporter.deleteData(Log, req, res);
};

// Retrieve and return all logs from the database =================================
exports.findAll = (req, res) => {
  // SORT THE DATA TO DISPLAY THE LATEST LOGS ON TOP
  Log.find().sort({ createdAt: -1 }).then((data) => {
    if (data) {
      return res.status(200).send(data);
    }
  })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: 'Error when accessing the DB!',
      });
    })
};

// Find a single log with the log's id ====================================
// that returns one that belongs to the current logged-in user only
exports.findOne = (req, res) => {
  supporter.findData(Log, req, res);
};


// Searching for log given tags
exports.search = (req, res) => {
  Search.logSearch(req, res);
};


