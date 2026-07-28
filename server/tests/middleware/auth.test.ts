// Mock jsonwebtoken to prevent buffer issues in tests
const now = Date.now();
jest.mock("jsonwebtoken", () => {
  return {
    sign: jest.fn((payload, secret) => {
      // Store the secret used for signing so we can verify later
      payload._secret = secret;
      const payloadStr = JSON.stringify(payload);
      return Buffer.from(payloadStr).toString("base64");
    }),
    verify: jest.fn((token, secret) => {
      // Check if token is valid base64
      let decoded;
      try {
        decoded = Buffer.from(token, "base64").toString("utf8");
      } catch {
        throw new Error("Token expired");
      }

      // Parse the JSON payload
      try {
        const payload = JSON.parse(decoded);

        // Verify the secret stored in payload matches the provided secret
        if (payload._secret !== secret) {
          throw new Error("Invalid token");
        }

        // Check if token is expired (iat is more than 1000ms ago)
        const iat = payload.iat * 1000;
        if (now - iat > 1000) {
          throw new Error("Token expired");
        }

        return payload;
      } catch (err) {
        throw new Error("Token expired");
      }
    }),
  };
});

import request from "supertest";
import { app } from "../server";
import jwt from "jsonwebtoken";

// Get ACCESS_TOKEN from environment
const accessToken =
  process.env.ACCESS_TOKEN || "test-secret-key-for-development";

const mockUser = {
  id: "123",
  email: "test@example.com",
  username: "testuser",
};

describe("JWT Auth Middleware", () => {
  // Helper to get token with specific user
  const getValidToken = (user?: Partial<typeof mockUser>) => {
    const userWithId = { ...mockUser, ...user };
    const jwtPayload = { ...userWithId, iat: Math.floor(Date.now() / 1000) };
    const token = jwt.sign(jwtPayload, accessToken);
    return token;
  };

  // Helper to get expired token
  const getExpiredToken = () => {
    const expiredDate = Date.now() - 1000 * 60 * 60 * 24 * 7; // 7 days ago
    const userWithId = { ...mockUser, iat: Math.floor(expiredDate / 1000) };
    const token = jwt.sign(userWithId, accessToken);
    return token;
  };

  it("GET /test should extract user from valid token", async () => {
    const token = getValidToken();
    const response = await request(app)
      .get("/test")
      .set("Cookie", ["access-token=" + token])
      .expect(200);

    expect(response.body).toEqual({
      message: "User authenticated successfully",
      user: {
        id: mockUser.id,
        email: mockUser.email,
        username: mockUser.username,
      },
    });
  });

  it("GET /test should reject invalid tokens (wrong secret)", async () => {
    const wrongSecret = "wrong-secret-key";
    const token = jwt.sign(mockUser, wrongSecret);

    const response = await request(app)
      .get("/test")
      .set("Cookie", ["access-token=" + token])
      .expect(400);

    expect(response.body).toEqual({ error: "Invalid Token" });
  });

  it("GET /test should handle missing tokens", async () => {
    const response = await request(app).get("/test").expect(401);

    // Server returns "Access Denied" or "Not authenticated" - both are acceptable
    expect(response.body.error).toBeDefined();
  });

  it("GET /test should handle expired tokens", async () => {
    const expiredToken = getExpiredToken();
    const response = await request(app)
      .get("/test")
      .set("Cookie", ["access-token=" + expiredToken])
      .expect(400);

    expect(response.body.error).toBeDefined();
  });

  it("GET /test should handle token without access-token name", async () => {
    const token = getValidToken();
    const response = await request(app)
      .get("/test")
      .set("Cookie", ["session-token=" + token])
      .expect(401);

    // Server returns "Access Denied" or "Not authenticated" - both are acceptable
    expect(response.body.error).toBeDefined();
  });

  it("GET /test should clear invalid token cookie", async () => {
    const invalidToken = "invalid-token-format";
    const response = await request(app)
      .get("/test")
      .set("Cookie", ["access-token=" + invalidToken])
      .expect(400);

    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.headers["set-cookie"][0]).toContain("access-token=");
  });
});
