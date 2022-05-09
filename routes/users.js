var express = require('express');
var router = express.Router();
const db = require('../db/models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async(req, res) => {
  const {firstName, lastName, email, hashPassword} = req.body
  const user = db.User.build({firstName, lastName, email, hashPassword})
  await user.save()
  res.send(user)
  console.log(req.body)
  
})

module.exports = router;
