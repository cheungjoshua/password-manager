const express = require("express");
const router = express.Router();
const crypto = require("crypto");

// crypto algorithm
const algorithm = "aes-256-cbc";

// Gen 16 bytes random data for init vector = user_IV
// Will use it when user create passwords model
const initVector = crypto.randomBytes(16);

// Secret Key for encrypt and decrypt
// It will move to env file with const secret key
const secretKey = crypto.randomBytes(16);
