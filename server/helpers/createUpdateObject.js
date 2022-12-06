const { encryptList } = require("./cryptoList");

const createObject = (initVector, fields, fieldValues) => {
  const updateObj = {};

  const encryptedArray = encryptList(initVector, fieldValues);

  for (const ii in encryptedArray) {
    updateObj[fields[ii]] = encryptedArray[ii];
  }
  return updateObj;
};

module.exports = { createObject };
