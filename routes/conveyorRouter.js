const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/conveyorCon');

// findAll = all spare parts in DB
app.route('/conveyor')
  //.post(controller.create)
  //.get(controller.findAll);
  .post(passport.authenticate('jwt', { session: false }), controller.create)
  .get(passport.authenticate('jwt', { session: false }), controller.findAll)

app.route('/conveyor/:id')
  //.put(controller.update)
  //.delete(controller.delete)
  //.get(controller.findOne);
  .put(passport.authenticate('jwt', { session: false }), controller.update)
  .delete(passport.authenticate('jwt', { session: false }), controller.delete)
  .get(passport.authenticate('jwt', { session: false }), controller.findOne);

/*
app
  .route('/conveyor/search')
  .post(passport.authenticate('jwt', { session: false }), controller.search);
*/

module.exports = app;