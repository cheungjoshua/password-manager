import request from "supertest";
import { app } from "./server";

describe("Mock server", () => {
  it("POST /users/signup should accept valid signup payloads", async () => {
    const response = await request(app).post("/users/signup").send({
      email: "test@example.com",
      username: "testuser",
      password: "SecurePassword123!",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: "test@example.com",
        username: "testuser",
      }),
    );
  });

  it("POST /users/signup should reject payloads missing required fields", async () => {
    const response = await request(app).post("/users/signup").send({
      email: "test@example.com",
      username: "testuser",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Missing required fields" });
  });

  it("GET /test should reject protected requests without a token", async () => {
    const response = await request(app).get("/test");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Access Denied" });
  });
});
