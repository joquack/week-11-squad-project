var express = require('express');
const db = require('../db/models');
var router = express.Router();

const { csrfProtection, asyncHandler } = require('./utils.js')
const { check, validationResult } = require('express-validator');


/* GET users listing. */
router.get('/signup', csrfProtection, (req, res) => {
    const user = db.User.build();
    res.render('user-signup', {
        title: 'Sign Up',
        user,
        csrfToken: req.csrfToken(),
    });
});

const userValidators = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for first name')
        .isLength({ max: 50 })
        .withMessage('First name must not be more than 50 characters long'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for last name')
        .isLength({ max: 50 })
        .withMessage('Last name must not be more than 50 characters long'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for username')
        .isLength({ max: 50 })
        .withMessage('Username must not be more than 50 characters long'),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for email')
        .isLength({ max: 50 })
        .withMessage('Email must not be more than 50 characters long'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ max: 50 })
        .withMessage('Password must not be more than 50 characters long')
        .isEmail()
        .withMessage('Email Address is not a valid email'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password must not be more than 50 characters long'),

];

router.post('/signup', csrfProtection, userValidators, asyncHandler(async (req, res) => {

    const {
        username,
        email,
        password,
        firstName,
        lastName
    } = req.body;

    const user = db.User.build({
        username,
        email,
        hashPassword: password,
        firstName,
        lastName
    });
    res.send('hello')
    console.log(req.body)
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await user.save();
        res.send('/');
    }
    else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('user-signup', {
            title: 'Sign Up',
            user,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));

//router.get('/login', function (req, res, next) {

// });

// router.post('/login', function (req, res, next) {

// });

module.exports = router;
