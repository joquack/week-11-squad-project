const express = require("express");
const router = express.Router();
const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils.js");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require('../auth');

const checkPermissions = (answer, currentUser) => {
  if (answer.userId !== currentUser.id) {
    const err = new Error('Illegal operation.');
    err.status = 403; // Forbidden
    throw err;
  }
};


router.get("/:questionId(\\d+)/create", csrfProtection, requireAuth, asyncHandler( async(req, res) => {
    const answer = await db.Answer.build();
    const questionId = parseInt(req.params.questionId, 10);
    res.render("answer-create", {
        answer,
        questionId,
        csrfToken: req.csrfToken(),
        title: "Submit an Answer"
    });
  })
);
const answerValidators = [
    check("body")
      .exists({ checkFalsy: true })
      .withMessage("Please provide an answer"),
  ];
router.post("/:questionId(\\d+)/create", csrfProtection,requireAuth, answerValidators, asyncHandler(async (req, res) => {
    const { questionId, body } = req.body;

    const answer = await db.Answer.build({
        questionId,
        body,
        userId: res.locals.user.id
    });

    try {
      await answer.save();
      res.redirect('../../questions/'+questionId);
    } catch (err) {
      res.render('answer-create', {
        title: "Submit an Answer",
        answer,
        questionId,
        error: err,
        csrfToken: req.csrfToken(),
      });
    }
  }));
router.get("/:questionId(\\d+)", asyncHandler( async(req, res) => {
    const questionId = parseInt(req.params.questionId, 10);
    const answers = await db.Answer.findAll({where: {questionId: questionId}});
    res.render("answer-list", {title: "Answers", answers});
  })
);
/*
router.get('/edit/:id(\\d+)', requireAuth, csrfProtection,
asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answer = await db.Answer.findByPk(answerId);

    checkPermissions(answer, res.locals.user);

    res.render('answer-edit', {
        title: 'Edit Answer',
        answer,
        csrfToken: req.csrfToken(),
    });
}));

router.post('/edit/:id(\\d+)', requireAuth, csrfProtection,
asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookToUpdate = await db.Book.findByPk(bookId);

    checkPermissions(bookToUpdate, res.locals.user);

    const {
        title,
        author,
        releaseDate,
        pageCount,
        publisher,
    } = req.body;

    const book = {
        title,
        author,
        releaseDate,
        pageCount,
        publisher,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await bookToUpdate.update(book);
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('book-edit', {
            title: 'Edit Book',
            book: { ...book, bookId },
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));

router.get('/book/delete/:id(\\d+)', requireAuth, csrfProtection,
asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await db.Book.findByPk(bookId);

    checkPermissions(book, res.locals.user);

    res.render('book-delete', {
        title: 'Delete Book',
        book,
        csrfToken: req.csrfToken(),
    });
}));

router.post('/book/delete/:id(\\d+)', requireAuth, csrfProtection,
asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await db.Book.findByPk(bookId);

    checkPermissions(book, res.locals.user);

    await book.destroy();
    res.redirect('/');
}));
*/
module.exports = router;
