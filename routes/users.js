const bcrypt = require('bcryptjs');
const db = require('../db/models');
var express = require('express');
var router = express.Router();

const { loginUser, logoutUser } = require('../auth.js');


const { csrfProtection, asyncHandler } = require('./utils.js')
const { check, validationResult } = require('express-validator');

router.get('/', asyncHandler(async (req, res) => {
  res.render('index', {
    title: 'User Page',
  });
}));


router.get('/login', csrfProtection, (req, res) => {
    res.render('user-login', {
      title: 'Login',
      csrfToken: req.csrfToken(),
    });
  });

  const loginValidators = [
    check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Email Address'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Password'),
  ];

  router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });

      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashPassword.toString());

        if (passwordMatch) {
            loginUser(req, res, user);
          return res.redirect('/users');
        }
      }

      errors.push('Login failed for the provided email address and password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('user-login', {
      title: 'Login',
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/logout', (req, res) => {
    logoutUser(req, res);
    res.redirect('/users/login');
  });


router.get('/signup', csrfProtection, (req, res) => {
    const user = db.User.build();
    res.render('user-signup', {
        title: 'Sign Up',
        user,
        csrfToken: req.csrfToken(),
    });
});


const userValidators = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for username')
        .isLength({ max: 50 })
        .withMessage('Username must not be more than 50 characters long'),
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
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email Address')
        .isLength({ max: 255 })
        .withMessage('Email Address must not be more than 255 characters long')
        .isEmail()
        .withMessage('Email Address is not a valid email')
        .custom((value) => {
          return db.User.findOne({ where: { email: value } })
            .then((user) => {
              if (user) {
                return Promise.reject('The provided Email Address is already in use by another account');
              }
            });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ max: 50 })
        .withMessage('Password must not be more than 50 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password must not be more than 50 characters long')
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password');
          }
          return true;
        }),

];

router.post('/signup', csrfProtection, userValidators, asyncHandler(async (req, res) => {

    const {
        username,
        firstName,
        lastName,
        email,
        password,
    } = req.body;

    const user = db.User.build({
        username,
        firstName,
        lastName,
        email,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const hashPassword = await bcrypt.hash(password, 10);
        user.hashPassword = hashPassword;
        await user.save();
        loginUser(req, res, user);
        res.redirect('/users');
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



module.exports = router;
