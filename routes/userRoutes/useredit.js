const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const { check, validationResult } = require("express-validator");
const {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser,
} = require("../../auth");

router.get(
  "/users/edit/:id/:userName",
  requireAuth,
  restoreUser,
  csrfProtection,
  async (req, res) => {
    const id = req.session.auth.userId;
    const user = await db.User.findByPk(id);
    const changes = await db.User.build();
    res.render("profile-edit");
  }
);

const userValidators = [
  check("username")
    .exists({ checkFalsy: false })
    .withMessage("Please provide a value for username")
    .isLength({ max: 50 })
    .withMessage("Username must not be more than 50 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Username is already in use by another account"
          );
        }
      });
    }),
  check("firstName")
    .exists({ checkFalsy: false })
    .withMessage("Please provide a value for first name")
    .isLength({ max: 50 })
    .withMessage("First name must not be more than 50 characters long"),
  check("lastName")
    .exists({ checkFalsy: false })
    .withMessage("Please provide a value for last name")
    .isLength({ max: 50 })
    .withMessage("Last name must not be more than 50 characters long"),
  check("email")
    .exists({ checkFalsy: false })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 255 })
    .withMessage("Email Address must not be more than 255 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),
];

router.put(
  "users/edit/:id/:userName",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    console.log();
    const { username, firstName, lastName, email, password } = req.body;
    console.log(req.body, `HELLO`);
    const user = await db.User.build({
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
      res.redirect("/users");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("profile-edit", {
        title: "Sign Up",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

module.exports = router;
