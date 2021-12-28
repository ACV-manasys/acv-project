const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/noteCon');

// findAll = all spare parts in DB
app.route('/note')
  //.post(controller.create)
  //.get(controller.findAll);
  .post(passport.authenticate('jwt', { session: false }), controller.create)
  // GET ALL NOTES
  .get(passport.authenticate('jwt', { session: false }), controller.findAll);

app.route('/note/private')
  // GET PRIVATE NOTE
  .get(passport.authenticate('jwt', { session: false }), controller.getPrivate);
app.route('/note/shared')
  // GET SHARED NOTES
  .get(passport.authenticate('jwt', { session: false }), controller.getShared);

app.route('/note/:id')
  //.put(controller.update)
  //.delete(controller.delete)
  //.get(controller.findOne);
  .put(passport.authenticate('jwt', { session: false }), controller.update)
  .delete(passport.authenticate('jwt', { session: false }), controller.delete)
  .get(passport.authenticate('jwt', { session: false }), controller.findOne);

app
  .route('/note/changeImportance/:id')
  .put(passport.authenticate('jwt', { session: false }), controller.changeImportance);

module.exports = app;