const express = require("express");
const router = express.Router();
const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils.js");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require('../auth');

const checkPermissions = (book, currentUser) => {
  if (book.userId !== currentUser.id) {
    const err = new Error('Illegal operation.');
    err.status = 403; // Forbidden
    throw err;
  }
};

// router.get("/", asyncHandler( async(req, res) => {
//     const answers = await db.Answer.findAll();
//     res.render("answer-list", {title: "Answers", answers});
//   })
// );

router.get("/create", csrfProtection, requireAuth, asyncHandler( async(req, res) => {
    const answer = await db.Answer.build();
    res.render("answer-create", {
        answer,
        csrfToken: req.csrfToken(),
        title: "Submit an Answer"
    });
  })
);

router.post("/create", csrfProtection, requireAuth, asyncHandler( async(req, res) => {
    const { content } = req.body;
    const answer = await db.Answer.create({
        title,
        content,
        userId: res.locals.user.id,
    });
    res.redirect("/answers");
  })
);

module.exports = router;
