import crypto from "crypto";
import { PasswordType } from "types/password";

// crypto algorithm
const algorithm = "aes-256-gcm";

// Secret Key for encrypt and decrypt
const secretKey = crypto.scryptSync(process.env.SECURITY_KEY, "salt", 32);

// Decrypt individual data inside the loop
const decryptData = (initVector: string, data: string) => {
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
const decryptList = (initVector: string, data: PasswordType) => {
  for (const item of data.collections) {
    item.app_name = decryptData(initVector, item.app_name);
    item.app_username = decryptData(initVector, item.app_username);
    item.app_password = decryptData(initVector, item.app_password);
  }
  return data;
};

// Encrypt the password list
const encryptData = (initVector: string, data: string) => {
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
// ** it should never use *** !!!!!!
const encryptList = (initVector: string, dataArray: PasswordType[]): [] => {
  // for (const obj in dataArray.collections) {
  //   for (const key in dataArray.collections[obj]){
  //     dataArray.collections[obj][key] = encryptData(initVector, dataArray.collections[obj][key])
  //   }
  //  ;
  // }
  return [];
};

export { encryptData, decryptList, decryptData, encryptList };
