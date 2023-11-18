import crypto from "crypto";

// crypto algorithm
const algorithm = "aes-256-gcm";

// Secret Key for encrypt and decrypt
const secretKey = crypto.scryptSync(process.env.SECURITY_KEY, "salt", 32);

// Decrypt individual data inside the loop
const decryptData = (initVector: string, data: any) => {
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

// Decrypt the password list
const decryptList = (initVector: string, data: any) => {
  for (const item of data) {
    item.app_name = decryptData(initVector, item.app_name);
    item.app_username = decryptData(initVector, item.app_username);
    item.app_password = decryptData(initVector, item.app_password);
  }
  return data;
};

// Encrypt the password list
const encryptData = (initVector: string, data: any) => {
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

// Encrypt the input data for Password update
const encryptList = (initVector: string, dataArray: any): [] => {
  for (const ii in dataArray) {
    dataArray[ii] = encryptData(initVector, dataArray[ii]);
  }
  return dataArray;
};

export { encryptData, decryptList, decryptData, encryptList };
