import {
  mockAuthenticatedRequest,
  mockObjectId,
  mockUnauthenticatedRequest,
  testUsers,
} from "../api/index";

describe("Test helper utilities", () => {
  it("should build authenticated request objects with a user payload", () => {
    const request = { headers: {} };
    const authenticatedRequest = mockAuthenticatedRequest(request, "user-2");

    expect(authenticatedRequest.user).toEqual(
      expect.objectContaining({
        _id: "user-2",
        email: "useruser-2@example.com",
        username: "useruser-2",
      }),
    );
  });

  it("should clear any existing user data for unauthenticated requests", () => {
    const request = { headers: {}, user: { _id: "stale-user" } };
    const unauthenticatedRequest = mockUnauthenticatedRequest(request);

    expect(unauthenticatedRequest.user).toBeNull();
  });

  it("should create ObjectIds that can be stringified safely", () => {
    const objectId = mockObjectId();

    expect(objectId.toString()).toMatch(/^[0-9a-f]{24}$/i);
  });

  it("should expose a reusable test user payload", () => {
    expect(testUsers.valid).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
      }),
    );
  });
});
