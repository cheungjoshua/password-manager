// Import dependency
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

// Dot Env
require("dotenv/config");

// Use Middle ware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cookie-session
// app.use(
//   cookieSession({
//     name: "session",
//     key: ["key1", "key2"],
//   })
// );

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
