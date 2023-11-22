import { encryptList } from "./cryptoList";

//*** REFACTOR****
// agrument -> collection_id , data : 3 fields
//*/

const createUpdateObj = (initVector: string, data: any) => {
  // Get Key --> field need to update
  const fields = Object.keys(data);

  // Get value --> field data need to update
  const fieldValues = Object.values(data);

  // Set empty obj for return
  const updateObj = {};

  // ******** REFACTOR ****************
  // create new updateObj type as PasswordType.collections obj
  // Use encrypData instead encryList
  // Remove encryptList function
  // should only return a single obj not array

  // const encryptedArray = encryptList(initVector, fieldValues);
  // console.log(encryptedArray);

  // Loop thought the encrypted data array and push to obj
  // for (const ii in encryptedArray) {
  //   // @ts-ignore: Unreachable code error
  //   updateObj[fields[ii]] = encryptedArray[ii];
  // }

  return updateObj;
};

export { createUpdateObj };
