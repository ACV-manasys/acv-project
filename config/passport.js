// FOR AUTHENTICATION - JWT //

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var passport = require('passport'),
    LocalStrategy = require('passport-local');