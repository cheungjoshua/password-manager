import { encryptList } from "./cryptoList";

const createObject = (initVector: string, data: any) => {
  // Get Key --> field need to update
  const fields = Object.keys(data);

  // Get value --> field data need to update
  const fieldValues = Object.values(data);

  // Set empty obj for return
  const updateObj = {};

  // Use encryptList function encrypt the field value need to update
  const encryptedArray = encryptList(initVector, fieldValues);
  // console.log(encryptedArray);

  // Loop thought the encrypted data array and push to obj
  for (const ii in encryptedArray) {
    // @ts-ignore: Unreachable code error
    updateObj[fields[ii]] = encryptedArray[ii];
  }

  return updateObj;
};

export { createObject };
