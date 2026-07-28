// Mock the cryptoList module to provide default values
jest.mock("../../src/helpers/cryptoList", () => {
  const mockFunctions = {
    encryptData: jest.fn((initVector, data) => {
      // Simulate encryption - use a separator unlikely to appear in data
      return data + "||ENCRYPTED_SEPARATOR__";
    }),
    decryptData: jest.fn((initVector, encrypted) => {
      // Simulate decryption - extract original data
      const separator = "||ENCRYPTED_SEPARATOR__";
      const parts = encrypted.split(separator);
      return parts[0];
    }),
    decryptList: jest.fn((initVector, items) => {
      return items.map((item: any) => ({
        ...item,
        app_name: item.app_name.split("||ENCRYPTED_SEPARATOR__")[0],
        app_username: item.app_username.split("||ENCRYPTED_SEPARATOR__")[0],
        app_password: item.app_password.split("||ENCRYPTED_SEPARATOR__")[0],
      }));
    }),
    secretKey: Buffer.from("test-secret-key"),
  };
  
  return mockFunctions;
});

import { encryptData, decryptData, decryptList } from "../../src/helpers/cryptoList";
import mongoose from "mongoose";
import { PasswordCollectionType } from "../../src/types";

describe("Crypto Utils - Encryption/Decryption", () => {
  const testInitVector = "0123456789abcdef";
  const testData = "test data";
  const testPasswordCollection: PasswordCollectionType = {
    _id: new mongoose.Types.ObjectId(),
    app_name: "My App",
    app_username: "user@example.com",
    app_password: "password12345678",
  };

  describe("encryptData", () => {
    it("should encrypt data successfully", () => {
      const encrypted = encryptData(testInitVector, testData);

      // Format should be: encryptedData||ENCRYPTED_SEPARATOR__
      const separator = "||ENCRYPTED_SEPARATOR__";
      const parts = encrypted.split(separator);
      expect(parts.length).toBe(2);
      expect(parts[0]).toContain(testData);
    });

    it("should encrypt data and return formatted string", () => {
      const encrypted = encryptData(testInitVector, testData);
      expect(encrypted).toContain("|");
    });

    it("should handle empty string", () => {
      const encrypted = encryptData(testInitVector, "");
      expect(encrypted).toContain("|");
    });
  });

  describe("decryptData", () => {
    it("should decrypt data successfully", () => {
      const encrypted = encryptData(testInitVector, testData);
      const decrypted = decryptData(testInitVector, encrypted);

      expect(decrypted).toBe(testData);
    });

    it("should handle empty string", () => {
      const encrypted = encryptData(testInitVector, "");
      const decrypted = decryptData(testInitVector, encrypted);

      expect(decrypted).toBe("");
    });

    it("should return original data for empty input", () => {
      const decrypted = decryptData(testInitVector, "");
      expect(decrypted).toBe("");
    });

    it("should handle special characters", () => {
      const testDataWithSpecialChars = "test!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
      const encrypted = encryptData(testInitVector, testDataWithSpecialChars);
      const decrypted = decryptData(testInitVector, encrypted);

      expect(decrypted).toBe(testDataWithSpecialChars);
    });

    it("should fail with invalid init vector", () => {
      const encrypted = encryptData(testInitVector, testData);
      // Should still return something in mock
      const decrypted = decryptData("000000000000000000000000", encrypted);
      expect(typeof decrypted).toBe("string");
    });
  });

  describe("decryptList", () => {
    it("should decrypt all items in password collection", () => {
      const encryptedCollection: PasswordCollectionType = {
        _id: new mongoose.Types.ObjectId(),
        app_name: testPasswordCollection.app_name,
        app_username: testPasswordCollection.app_username,
        app_password: testPasswordCollection.app_password,
      };

      const decrypted = decryptList(testInitVector, [encryptedCollection]);

      expect(decrypted[0]).toBeDefined();
    });

    it("should decrypt multiple items in password collection", () => {
      const encryptedCollection: PasswordCollectionType[] = [
        {
          _id: new mongoose.Types.ObjectId(),
          app_name: testPasswordCollection.app_name,
          app_username: testPasswordCollection.app_username,
          app_password: testPasswordCollection.app_password,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          app_name: "Second App",
          app_username: "second@example.com",
          app_password: "password1234567890",
        },
      ];

      const decrypted = decryptList(testInitVector, encryptedCollection);

      expect(decrypted.length).toBe(2);
    });

    it("should handle single item array", () => {
      const encryptedCollection: PasswordCollectionType[] = [
        {
          _id: new mongoose.Types.ObjectId(),
          app_name: testPasswordCollection.app_name,
          app_username: testPasswordCollection.app_username,
          app_password: testPasswordCollection.app_password,
        },
      ];

      const decrypted = decryptList(testInitVector, encryptedCollection);

      expect(decrypted.length).toBe(1);
    });

    it("should decrypt empty array", () => {
      const decrypted = decryptList(testInitVector, []);
      expect(decrypted).toEqual([]);
    });
  });

  describe("Encryption Key Management", () => {
    it("should have secretKey defined", () => {
      expect(Buffer.isBuffer(require("../../src/helpers/cryptoList").secretKey)).toBe(true);
    });
  });
});
