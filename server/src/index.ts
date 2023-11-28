// Import dependency
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Dot Env
require("dotenv/config");

// Use Middle ware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import Routes
import routes from "./routes";

// Use Imported Routes
app.use("/", routes());

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