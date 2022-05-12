const express = require("express");
const router = new express.Router();
const db = require("../db/models");
const {User, Question, Answer, AnswerVote} = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils.js");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");

const checkPermissions = (question, currentUser) => {
  if (question.userId !== currentUser.id) {
    const err = new Error("Illegal operation.");
    err.status = 403; // Forbidden
    throw err;
  }
};


router.get("/", asyncHandler(async (req, res) => {
  const questions = await db.Question.findAll({include: User});
  res.render("question-list", { title: "Questions", questions });
})
);

router.get("/:id(\\d+)", csrfProtection, asyncHandler(async (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const question = await db.Question.findByPk(questionId, {include: User});

  const answer = await db.Answer.build();
  const answers = await db.Answer.findAll({ where: { questionId: questionId }, include: [User, AnswerVote] });
  const votes = answers[0].dataValues.AnswerVotes

  res.render("question", { title: `${question.title}`, question, votes, questionId, answer, answers, csrfToken: req.csrfToken()});
})
);


router.get("/create", csrfProtection, requireAuth, asyncHandler(async (req, res) => {
  const question = await db.Question.build();
  res.render("question-create", {
    question,
    csrfToken: req.csrfToken(),
    title: "Create Question"
  });
})
);

const questionValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Title')
    .isLength({ max: 255 })
    .withMessage('Title must not be more than 255 characters long'),
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for content'),
];

router.post("/create", csrfProtection, requireAuth, questionValidators, asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const question = db.Question.build({
    title,
    content,
    userId: res.locals.user.id,
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await question.save();
    res.redirect('/questions');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('question-create', {
      title: 'Create Question',
      question,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
})
);


router.get(
  "/edit/:id(\\d+)",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await db.Question.findByPk(questionId);

    checkPermissions(question, res.locals.user);

    res.render("question-edit", {
      title: "Edit Question",
      question,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/edit/:id(\\d+)",
  requireAuth,
  csrfProtection,
  questionValidators,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const questionToUpdate = await db.Question.findByPk(questionId);

    checkPermissions(questionToUpdate, res.locals.user);
    const { title, content } = req.body;

    const question = {
      title,
      content,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await questionToUpdate.update(question);
      res.redirect("/questions");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("question-edit", {
        title: "Edit Question",
        question: { ...question, questionId },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);



module.exports = router;
