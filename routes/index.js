var express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("home");
});
router.get("/home", (req, res) => {
  res.render("index", { title: "Welcome to StackCode" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "About" });
});

module.exports = router;
