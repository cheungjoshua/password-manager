import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../src/models/User";

describe("User Model", () => {
  let user: any;
  let mongoServer: MongoMemoryServer;

  const makeUniqueValue = (prefix: string) => {
    const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return `${prefix}-${suffix}`;
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  beforeEach(async () => {
    await User.deleteMany({});

    const username = `user-${makeUniqueValue("u")}`;
    const email = `${makeUniqueValue("email")}@example.com`;
    const password = makeUniqueValue("pw");

    user = await new User({
      email,
      username,
      password,
      user_IV: "test_iv_for_validation",
    }).save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("User Schema", () => {
    it("should have required fields (email, username, password, user_IV)", async () => {
      expect(user.email).toBeDefined();
      expect(user.username).toBeDefined();
      expect(user.password).toBeDefined();
      expect(user.user_IV).toBeDefined();
    });

    it("should validate email format", async () => {
      await expect(user.validate()).resolves.toBeUndefined();
    });

    it("should fail validation with invalid email", async () => {
      const plainUser = new User({
        email: "invalid-email",
        username: `user-${makeUniqueValue("u")}`,
        password: makeUniqueValue("pw"),
        user_IV: "test_iv_for_validation",
      });

      await expect(plainUser.validate()).rejects.toMatchObject({
        errors: expect.anything(),
      });
    });

    it("should fail validation with missing email", async () => {
      const plainUser = new User({
        email: "",
        username: `user-${makeUniqueValue("u")}`,
        password: makeUniqueValue("pw"),
        user_IV: "test_iv_for_validation",
      });

      await expect(plainUser.validate()).rejects.toMatchObject({
        errors: expect.anything(),
      });
    });

    it("should fail validation with missing username", async () => {
      const plainUser = new User({
        email: `${makeUniqueValue("email")}@example.com`,
        username: "",
        password: makeUniqueValue("pw"),
        user_IV: "test_iv_for_validation",
      });

      await expect(plainUser.validate()).rejects.toMatchObject({
        errors: expect.anything(),
      });
    });

    it("should fail validation with missing password", async () => {
      const plainUser = new User({
        email: `${makeUniqueValue("email")}@example.com`,
        username: `user-${makeUniqueValue("u")}`,
        password: "",
        user_IV: "test_iv_for_validation",
      });

      await expect(plainUser.validate()).rejects.toMatchObject({
        errors: expect.anything(),
      });
    });
  });

  describe("Password Hashing", () => {
    it("should hash password before saving", async () => {
      const plainPassword = makeUniqueValue("pw");
      const plainUser = new User({
        email: `${makeUniqueValue("email")}@example.com`,
        username: `user-${makeUniqueValue("u")}`,
        password: plainPassword,
        user_IV: "test_iv_for_validation",
      });
      const savedUser = await plainUser.save();

      expect(savedUser.password).not.toBe(plainPassword);
      expect(savedUser.password).toBeDefined();
      expect(savedUser.password).toContain("$2b$");
    });
  });

  describe("Document/Query Structure", () => {
    it("should have _id field", async () => {
      expect(user._id).toBeDefined();
      expect(user._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });

    it("should have created_at and updated_at timestamps", async () => {
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it("should support query by email", async () => {
      const foundUser = await User.findOne({ email: user.email });
      expect(foundUser).toBeDefined();
      expect(foundUser?.email).toBe(user.email);
    });

    it("should support query by username", async () => {
      const foundUser = await User.findOne({ username: user.username });
      expect(foundUser).toBeDefined();
      expect(foundUser?.username).toBe(user.username);
    });

    it("should support query by email regex", async () => {
      const emailRegex = user.email.split("@")[0];
      const foundUser = await User.findOne({ email: { $regex: emailRegex } });
      expect(foundUser).toBeDefined();
      expect(foundUser?.email).toBe(user.email);
    });

    it("should support compound queries", async () => {
      const foundUser = await User.findOne({
        email: user.email,
        username: user.username,
      });
      expect(foundUser).toBeDefined();
      expect(foundUser?.email).toBe(user.email);
    });

    it("should support email regex pattern matching", async () => {
      const foundUser = await User.findOne({
        email: {
          $regex: user.email.split("@")[0],
          $options: "i",
        },
      });
      expect(foundUser).toBeDefined();
      expect(foundUser?.email).toBe(user.email);
    });
  });

  describe("Find Methods", () => {
    it("should find user by ID", async () => {
      const foundUser = await User.findById(user._id);
      expect(foundUser).toBeDefined();
      expect(foundUser?._id.toString()).toBe(user._id.toString());
    });

    it("should find all users", async () => {
      const users = await User.find({});
      expect(users.length).toBeGreaterThanOrEqual(1);
    });

    it("should find by email with regex", async () => {
      const users = await User.find({
        email: { $regex: user.email },
      });
      expect(users.length).toBeGreaterThanOrEqual(1);
    });

    it("should find by email prefix", async () => {
      const emailPrefix = user.email.split("@")[0];
      const users = await User.find({
        email: { $regex: `^${emailPrefix}@` },
      });
      expect(users.length).toBeGreaterThanOrEqual(1);
    });
  });
});
