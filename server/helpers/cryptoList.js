// crypto algorithm
const algorithm = "aes-256-cbc";

// Secret Key for encrypt and decrypt
// It will move to env file with const secret key
const secretKey = process.env.SECURITY_KEY;

// encrypt the password list

const encryptList = (initVector, data) => {
  let result = [];
  return result;
};

// decrypt the password list

const decryptList = (initVector, data) => {
  let result = [];
  return result;
};

module.exports = { encryptList, decryptList };
