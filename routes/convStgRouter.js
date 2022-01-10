const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/convStgCon');

// findAll = all conveyors in DB
app.route('/convStg')
  .post(passport.authenticate('jwt', { session: false }), controller.create)
  .get(passport.authenticate('jwt', { session: false }), controller.findAll)

// findAll = all conveyors in DB
app.route('/convStg/findByDate')
  .post(passport.authenticate('jwt', { session: false }), controller.findAllByDate);

app.route('/convStg/:id')
  .put(passport.authenticate('jwt', { session: false }), controller.update)
  .delete(passport.authenticate('jwt', { session: false }), controller.delete)
  .get(passport.authenticate('jwt', { session: false }), controller.findOne);

module.exports = app;