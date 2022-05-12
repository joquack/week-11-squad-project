const express = require("express");
const router = express.Router();
const db = require("../../db/models");

router.get("/users/:id(\\d+)/:userName", async (req, res) => {
  const numId = parseInt(req.params.id);
  console.log(`*****`, Object.keys(req.signedCookies));
  const name = req.params.userName;
  let user = await db.User.findByPk(numId);
  try {
    console.log(user.username == name, user.username, name);
    if (
      user.username === name &&
      numId === user.id &&
      req.session.auth.userId === numId
    ) {
      return res.render("user-profile");
    }
    if (user.username == name && req.session.auth.userId === numId) {
      return res.render("profile-found-logged", { name });
    }
    if (user.username != name) {
      return res.render("profile-not-found", { user: req.session.auth.userId });
    }
    if (user.username == name && req.session.auth.userId != numId) {
      return res.render("limited-view", {
        user,
        name,
        id: req.session.auth.userId,
      });
    }

    return res.render(`not-logged`, {
      name,
      title: `${
        name.charAt(0).toUpperCase() + name.slice(1)
      }'s Profile | Stack Code`,
    });
  } catch (error) {
    if (user) {
      return res.render("not-logged", {
        name: user.firstName,
        title: `${
          name.charAt(0).toUpperCase() + name.slice(1)
        }'s Profile | Stack Code`,
      });
    }
    res.render("profile-not-found", { name });
  }
});

module.exports = router;
