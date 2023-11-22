// Import dependency
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

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
import routes from "./routes";
// import usersRoute from "./routes/users";
//import passwordsRoute from "./routes/passwords";

// Use Imported Routes
app.use("/", routes());
// app.use("/users", usersRoute);
//app.use("/api/passwords", passwordsRoute);

// Testing Route
// app.get("/", (req, res) => {
//   res.send("Connected");
//   console.log("OK");
// });

// Mongoose Connect to DB
mongoose
  .connect(process.env.MONGO_URL)
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
