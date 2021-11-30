// Controller to perform CRUD on user parameter
const User = require('../models/user');
const supporter = require('./supporter');

exports.findAll = (req, res) => {
  supporter.findAllData(User, req, res);
}

exports.update = (req, res) => {
  supporter.updateData(User, req, res);
}

exports.delete = (req, res) => {
  supporter.deleteData(User, req, res);
}

exports.findOne = (req, res) => {
  supporter.findData(User, req, res);
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

    res.send(user);
  } else {
    // return new Error("Wrong password")
    return res.status(401).send("Wrong password");
  }
};