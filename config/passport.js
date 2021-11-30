var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

var passport = require('passport'),
  LocalStrategy = require('passport-local');

const User = require('mongoose').model('User');
//const User = require('../models/user');

// Checks for valid token when performing any route (except login and registration)
passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PASSPORT_SECRET,
      passReqToCallback: true,
    },
    function (req, jwt_payload, done) {
      User.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
    }
  )
);

// Does the login and returns a token if login successfully
passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user && user.verifyPassword(password) && user.activated) {
        return done(null, user);
      }

      return done(null, false);
    });
  })
);

// Register for an account by de-activate it
passport.use(
  'registration',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, done) {

      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, { message: "Account existed" });
        }
        else {
          var newUser = new User();

          newUser.name = req.body.name;
          newUser.username = username;
          newUser.password = newUser.hashPassword(password);
          newUser.email = req.body.email.toLowerCase();
          newUser.activated = true;

          newUser.save();
          return done(null, newUser);
        }
      });
    }
  )
);

module.exports = passport;
