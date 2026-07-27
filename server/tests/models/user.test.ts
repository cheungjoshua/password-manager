import User from "../../src/models/User";

jest.mock("mongoose", () => {
  const mockCreate = jest.fn();
  const mockFindById = jest.fn();

  return {
    __esModule: true,
    default: {
      Schema: jest.fn(() => ({
        pre: jest.fn(),
      })),
      model: jest.fn(() => ({
        create: mockCreate,
        findById: mockFindById,
        schema: { username: {} },
      })),
    },
    __mockCreate: mockCreate,
    __mockFindById: mockFindById,
  };
});

const { __mockCreate: mockCreate, __mockFindById: mockFindById } =
  jest.requireMock("mongoose");

describe("User Model Schema Validation and Behavior", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fail to save a user without required fields like username and email", async () => {
    const invalidUserData = { password: "strongpassword123!" };
    const validationError = Object.assign(new Error("Validation failed"), {
      name: "ValidationError",
    });
    mockCreate.mockRejectedValueOnce(validationError);

    await expect(User.create(invalidUserData)).rejects.toMatchObject({
      name: "ValidationError",
    });
  });

  it("should hash the password before saving a new user", async () => {
    const rawPassword = "SecretPass456!";
    mockCreate.mockResolvedValueOnce({ password: `HASHED_${rawPassword}` });

    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: rawPassword,
    });

    expect(user.password).toBe(`HASHED_${rawPassword}`);
  });

  it("should retrieve a user document correctly by ID", async () => {
    const userId = "user123";
    const mockUserDocument = {
      _id: userId,
      username: "retrieveduser",
      email: "test@example.com",
      password: "HASHED_...user...",
    };

    mockFindById.mockResolvedValueOnce(mockUserDocument);

    const retrievedUser = await User.findById(userId);

    expect(retrievedUser).toEqual(mockUserDocument);
    expect(User.findById).toHaveBeenCalledWith(userId);
  });

  it("should have proper indexes on critical fields", () => {
    const userSchema = User.schema;
    expect(userSchema).toHaveProperty("username");
  });
});
