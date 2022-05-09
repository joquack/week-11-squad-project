var express = require('express');
const db = require('../db/models');
var router = express.Router();

const { csrfProtection, asyncHandler } = require('./utils.js')
const { check, validationResult } = require('express-validators');


/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.get('/signup', function(req, res, next) {

});

router.post('/signup', function(req, res, next) {

});

router.get('/login', function(req, res, next) {

});

router.post('/login', function(req, res, next) {

});

module.exports = router;
