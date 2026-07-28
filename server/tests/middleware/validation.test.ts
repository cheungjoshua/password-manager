import mongoose from "mongoose";
import {
  validateSignUp,
  validateLogin,
  validatePost,
} from "../../src/helpers/validation";
import { PasswordCollectionType } from "../../src/types";

describe("Joi Validation Middleware", () => {
  describe("validateSignUp", () => {
    it("validateSignUp should validate valid user data", () => {
      const data = {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      };

      const result = validateSignUp(data);
      expect(result.error).toBeUndefined();
    });

    it("validateSignUp should reject missing required fields", () => {
      const data = {
        email: "test@example.com",
      } as any;

      const result = validateSignUp(data);
      expect(result.error).toBeDefined();
    });

    it("should reject invalid email format", () => {
      const data = {
        email: "invalid-email",
        username: "testuser",
        password: "password123",
      };

      const result = validateSignUp(data);
      expect(result.error).toBeDefined();
      expect(result.error!.details[0].message).toContain("email");
    });

    it("validateSignUp should reject email shorter than 6 chars", () => {
      const data = {
        email: "te",
        username: "testuser",
        password: "password123",
      };

      const result = validateSignUp(data);
      expect(result.error).toBeDefined();
    });

    it("validateSignUp should reject username shorter than 6 chars", () => {
      const data = {
        email: "test@example.com",
        username: "abcde",
        password: "password123",
      };

      const result = validateSignUp(data);
      expect(result.error).toBeDefined();
    });

    it("should reject password shorter than 6 chars", () => {
      const data = {
        email: "test@example.com",
        username: "testuser",
        password: "abc",
      };

      const result = validateSignUp(data);
      expect(result.error).toBeDefined();
    });
  });

  describe("validateLogin", () => {
    it("validateLogin should validate valid login credentials", () => {
      const data = {
        email: "test@example.com",
        password: "password123",
      };

      const result = validateLogin(data);
      expect(result.error).toBeUndefined();
    });

    it("validateLogin should reject missing email", () => {
      const data = {
        password: "password123",
      } as any;

      const result = validateLogin(data);
      expect(result.error).toBeDefined();
    });

    it("validateLogin should reject missing password", () => {
      const data = {
        email: "test@example.com",
      } as any;

      const result = validateLogin(data);
      expect(result.error).toBeDefined();
    });

    it("should reject invalid email format", () => {
      const data = {
        email: "invalid-email",
        password: "password123",
      };

      const result = validateLogin(data);
      expect(result.error).toBeDefined();
    });

    it("should reject password shorter than 6 chars", () => {
      const data = {
        email: "test@example.com",
        password: "abc",
      };

      const result = validateLogin(data);
      expect(result.error).toBeDefined();
    });
  });

  describe("validatePost", () => {
    const validData = {
      _id: new mongoose.Types.ObjectId().toString(),
      app_name: "My App",
      app_username: "user@example.com",
      app_password: "password12345678",
    } as unknown as PasswordCollectionType;

    it("validatePost should validate valid password entry data", () => {
      const data = { ...validData };
      const result = validatePost(data);
      expect(result.error).toBeUndefined();
    });

    it("validatePost should reject missing app_name", () => {
      const data = {
        _id: new mongoose.Types.ObjectId(),
        app_username: "user@example.com",
        app_password: "password12345678",
      } as any;

      const result = validatePost(data);
      expect(result.error).toBeDefined();
    });

    it("validatePost should reject app_name shorter than 3 chars", () => {
      const data = {
        _id: new mongoose.Types.ObjectId(),
        app_name: "xy",
        app_username: "user@example.com",
        app_password: "password12345678",
      };

      const result = validatePost(data);
      expect(result.error).toBeDefined();
    });

    it("validatePost should reject app_username shorter than 6 chars", () => {
      const data = {
        _id: new mongoose.Types.ObjectId(),
        app_name: "My App",
        app_username: "abcde",
        app_password: "password12345678",
      };

      const result = validatePost(data);
      expect(result.error).toBeDefined();
    });

    it("validatePost should reject app_username with invalid email format", () => {
      const data = {
        _id: new mongoose.Types.ObjectId(),
        app_name: "My App",
        app_username: "invalid-email",
        app_password: "password12345678",
      };

      const result = validatePost(data);
      expect(result.error).toBeDefined();
    });

    it("validatePost should reject app_password shorter than 8 chars", () => {
      const data = {
        _id: new mongoose.Types.ObjectId(),
        app_name: "My App",
        app_username: "user@example.com",
        app_password: "abc123",
      };

      const result = validatePost(data);
      expect(result.error).toBeDefined();
    });

    it("validatePost should accept data without _id (optional field)", () => {
      const data: PasswordCollectionType = {
        app_name: "My App",
        app_username: "user@example.com",
        app_password: "password12345678",
      };

      const result = validatePost(data);
      expect(result.error).toBeUndefined();
    });
  });
});
