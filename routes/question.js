const express = require("express");
const router = new express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils.js");

router.get("/newquestion", csrfProtection, async (req, res) => {
  const newQuestion = await db.Question.build();
  res.render("new-question", { newQuestion, _csurf: req.csrfToken() });
});

module.exports = router;
