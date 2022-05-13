const express = require("express");
const router = express.Router();
const db = require("../../db/models");

router.get("/sandbag", async (req, res) => {
  res.render("sandbag");
});

module.exports = router;
