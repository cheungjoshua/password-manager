// Test setup file
// Set default environment variables for testing

jest.mock("jsonwebtoken", () => {
  const createToken = (payload) => {
    if (typeof payload === "string") {
      return payload;
    }

    return Buffer.from(JSON.stringify(payload)).toString("base64");
  };

  return {
    __esModule: true,
    default: {
      sign: jest.fn((payload) => createToken(payload)),
      verify: jest.fn((token) => {
        try {
          return JSON.parse(Buffer.from(token, "base64").toString("utf8"));
        } catch {
          throw new Error("Invalid token");
        }
      }),
    },
    sign: jest.fn((payload) => createToken(payload)),
    verify: jest.fn((token) => {
      try {
        return JSON.parse(Buffer.from(token, "base64").toString("utf8"));
      } catch {
        throw new Error("Invalid token");
      }
    }),
  };
});

// Mock SECURITY_KEY for crypto tests
if (!process.env.SECURITY_KEY) {
  process.env.SECURITY_KEY = "test-security-key-for-encryption-32-characters";
}

// Mock ACCESS_TOKEN for JWT tests
if (!process.env.ACCESS_TOKEN) {
  process.env.ACCESS_TOKEN = "test-secret-key-for-jwt-signing";
}

// Mock MONGODB_URI for tests
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = "mongodb://localhost:27017/test";
}

console.log("Test setup complete");
