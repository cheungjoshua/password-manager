// Import dependency
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const crypto = require("crypto");

// crypto algorithm
const algorithm = "aes-256-cbc";

// Gen 16 bytes random data for init vector = user_IV
// Will use it when user create passwords model
const initVector = crypto.randomBytes(16);

// Secret Key for encrypt and decrypt
// It will move to env file with const secret key
const secretKey = crypto.randomBytes(16);

// Dot Env
require("dotenv/config");

// Use Middle ware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const usersRoute = require("./routes/users");

// Use Imported Routes
app.use("/users", usersRoute);

// Testing Route
app.get("/", (req, res) => {
  res.send("Connected");
  console.log("OK");
});

// Mongoose Connect to DB
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Express listen Port
app.listen(8080, () => {
  console.log(`Server started`);
});
