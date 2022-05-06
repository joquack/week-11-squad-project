const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
// console.log(port);

app.get("/", (req, res) => {
  res.send("Working Server...");
});

app.listen(port || 8080, () => {
  console.log(`Server is up....${port}!`);
});
