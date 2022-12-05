const crypto = require("crypto");

// crypto algorithm
const algorithm = "aes-256-gcm";

// Secret Key for encrypt and decrypt
// It will move to env file with const secret key

const secretKey = crypto.scryptSync(process.env.SECURITY_KEY, "salt", 32);

// decrypt individual data inside the loop

const decryptData = (initVector, data) => {
  // console.log(data);
  const [encryptedData, authTag] = data.split("|");
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(initVector, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTag, "hex"));
  let decryptData = decipher.update(encryptedData, "hex", "utf-8");
  decryptData += decipher.final("utf-8");
  return decryptData;
};

// decrypt the password list
// Loop thought the array and use decryptData function
// to decrypt the object inside the array
///////////// *** Need to redo !!! ***
//////////// *** cannot loop obj inside map ****
/////////// *** only decrypt the username, siteName, password ******

const decryptList = (initVector, data) => {
  for (const item of data) {
    item.app_name = decryptData(initVector, item.app_name);
    item.app_username = decryptData(initVector, item.app_username);
    item.app_password = decryptData(initVector, item.app_password);
  }
  console.log(data);
  return data;
};

// encrypt the password list
const encryptData = (initVector, data) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    Buffer.from(initVector, "hex")
  );
  let encryptData = cipher.update(data, "utf-8", "hex");
  encryptData += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return [encryptData, authTag].join("|");
};

module.exports = { encryptData, decryptList, decryptData };
