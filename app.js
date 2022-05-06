const express = require("express");
const app = express();
const port = process.env.PORT;
require("dotenv").config();
console.log(process.env);

app.get("/", (req, res) => {
  res.send("Working Server...");
});

app.listen(port || 8080, () => {
  console.log("Server is up....!");
});
