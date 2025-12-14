const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("EXPRESS TEST WORKING");
});

app.listen(5050, "0.0.0.0", () => {
  console.log("Express listening on 5050");
});
