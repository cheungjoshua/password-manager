import User from "../../src/models/User";

describe("User model schema", () => {
  const schema = User.schema as any;

  it("should require the core profile fields", () => {
    expect(schema.obj.email.required).toEqual([true, "Email is required"]);
    expect(schema.obj.username.required).toEqual([
      true,
      "Username is required",
    ]);
    expect(schema.obj.password.required).toEqual([
      true,
      "Password is required",
    ]);
    expect(schema.obj.user_IV.required).toEqual([true, "User IV is required"]);
  });

  it("should enforce minimum username and password lengths", () => {
    expect(schema.obj.username.minlength).toEqual([
      3,
      "Username must be at least 3 characters",
    ]);
    expect(schema.obj.password.minlength).toEqual([
      6,
      "Password must be at least 6 characters",
    ]);
  });

  it("should normalize email values", () => {
    expect(schema.obj.email.trim).toBe(true);
    expect(schema.obj.email.lowercase).toBe(true);
  });

  it("should enable timestamps on the schema", () => {
    expect(schema.options.timestamps).toBe(true);
  });
});
