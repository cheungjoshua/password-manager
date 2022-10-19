const express = require("express");
const router = express.Router();

router.get("/", () => {
  console.log("connected to user main");
});

module.exports = router;
