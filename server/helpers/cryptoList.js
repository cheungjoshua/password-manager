const crypto = require("crypto");

// crypto algorithm
const algorithm = "aes-256-cbc";

// Secret Key for encrypt and decrypt
// It will move to env file with const secret key
const secretKey = process.env.SECURITY_KEY;

// encrypt individual data inside the loop
const decryptData = (initVector, data) => {
  const decipher = crypto.createCipheriv(algorithm, secretKey, initVector);
  let decryptData = decipher.update(data, "hex", "utf-8");
  decryptData += decipher.final("utf-8");
  return decryptData;
};

// encrypt the password list
const decryptList = (initVector, data) => {
  const result = data.map((dataObj) => {
    let newData = {};
    for (const key in dataObj) {
      newData[key] = decryptData(initVector, dataObj.key);
    }
    return newData;
  });

  return result;
};

// decrypt the password list
const encryptList = (initVector, data) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, initVector);
  let encryptData = cipher.update(data, "utf-8", "hex");
  encryptData += cipher.final("hex");
  return encryptData;
};

module.exports = { encryptList, decryptList };
