// Import dependency
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

// Use Middle ware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Connected");
  console.log("OK");
});

app.listen(8080, () => {
  console.log(`Server started`);
});
