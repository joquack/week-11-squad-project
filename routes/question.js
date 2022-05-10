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

router.get("/", asyncHandler( async(req, res) => {
    const questions = await db.Question.findAll();
    res.render("question-list", {title: "Questions", questions});
  })
);

router.get("/create", csrfProtection, requireAuth, asyncHandler( async(req, res) => {
    const question = await db.Question.build();
    res.render("question-create", {
        question,
        csrfToken: req.csrfToken(),
        title: "Create a Question"
    });
  })
);

router.post("/create", csrfProtection, requireAuth, asyncHandler( async(req, res) => {
    const { title, content } = req.body;
    const question = await db.Question.create({
        title,
        content,
        userId: res.locals.user.id,
    });
    res.redirect("/questions");
  })
);

module.exports = router;
