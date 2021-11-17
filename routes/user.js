const express = require('express');
const app = express();

const controller = require('../controllers/user');
const passport = require('../config/passport');

const jwt = require('jsonwebtoken');