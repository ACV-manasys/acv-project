// Controller to perform CRUD on user parameter
const User = require('../models/user');
const supporter = require('./supporter');

exports.findAll = (req, res) => {
  supporter.findAllData(User, req, res);
}

exports.update = (req, res) => {
  // Get the id
  const id = req.user._id;

  // Case of updated sucessfully
  User
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

exports.delete = (req, res) => {
  supporter.deleteData(User, req, res);
}

exports.findOne = (req, res) => {
  supporter.findData(User, req, res);
}

exports.findAllExcSelf = (req, res) => {
  User
    .find()
    .then((data) => {
      var toReturn = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.username != req.user.username) {
          toReturn.push(element);
        }
      }
      res.send(toReturn);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}

exports.changeAccessment = (req, res) => {
  const id = req.params.id;

  User.findById({ _id: id })
    .then(async (user) => {
      if (user) {
        user.activated = !user.activated;
        await user.save().then((savedData) => {
          res.status(200).send(savedData);
        })
      }
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when updating Data!',
      });
    });
}

exports.changePassword = async (req, res) => {
  if (!req.user) {
    return console.error();
  }

  console.log(req.body)

  let user = await User.findOne({ username: req.user.username });

  if (user.verifyPassword(req.body.oldPassword)) {
    user.password = user.hashPassword(req.body.newPassword);

    await user.save();

    res.status(200).send(user);
  } else {
    // return new Error("Wrong password")
    return res.status(401).send("Wrong password");
  }
};