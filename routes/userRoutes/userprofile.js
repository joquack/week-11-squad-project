const express = require("express");
const router = express.Router();
const db = require("../../db/models");

router.get("/users/:id(\\d+)/:userName", async (req, res) => {
  const numId = parseInt(req.params.id);
  const name = req.params.userName;
  let user = await db.User.findByPk(numId);
  try {
    if (
      user.firstName === name &&
      numId === user.id &&
      req.session.auth.userId === numId
    ) {
      return res.render("user-profile");
    }
    if (user.firstName == name && req.session.auth.userId === numId) {
      return res.render("profile-found-logged", { name, title: `${name}'s Profile` });
    }
    if (user.firstName != name) {
      return res.render("profile-not-found", { user: req.session.auth.userId, title:`Profile Not Found | StackCode`});
    }
    if (user.firstName == name && req.session.auth.userId != numId) {
      return res.render("limited-view", {
        user,
        name,
        id: req.session.auth.userId,
      });
    }

    return res.render(`not-logged`, { name, title:`${name.charAt(0).toUpperCase() + name.slice(1)}'s Profile | Stack Code` });
  } catch (error) {
    if (user) {
      return res.render("not-logged", { name: user.firstName, title:`${name.charAt(0).toUpperCase() + name.slice(1)}'s Profile | Stack Code` });
    }
    res.render("profile-not-found", { name });
  }
});

module.exports = router;
