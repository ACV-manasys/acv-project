const express = require('express');
const app = express();
const passport = require('../config/passport');

const controller = require('../controllers/engr');

// findAll = all spare parts in DB
app.route('/engr')
    //.post(controller.create)
    //.get(controller.findAll);
    .post(passport.authenticate('jwt', { session: false }), controller.create)
    // GET ALL ENGRS
    .get(passport.authenticate('jwt', { session: false }), controller.findAll);

app.route('/engr/:id')
    //.put(controller.update)
    //.delete(controller.delete)
    //.get(controller.findOne);
    .put(passport.authenticate('jwt', { session: false }), controller.update)
    .delete(passport.authenticate('jwt', { session: false }), controller.delete)
    .get(passport.authenticate('jwt', { session: false }), controller.findOne);

module.exports = app;