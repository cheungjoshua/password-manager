import {
  createPassword,
  getPasswords,
  updatePassword,
  deletePassword,
} from "../../src/controllers/password";
import { Password } from "../../src/models/Password";
import { User } from "../../src/models/User";
import { validatePost } from "../../src/helpers/validation";
import { encryptData, decryptList } from "../../src/helpers/cryptoList";

jest.mock("../../src/models/Password", () => ({
  Password: {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    updateOne: jest.fn(),
  },
}));

jest.mock("../../src/models/User", () => ({
  User: {
    findOne: jest.fn(),
  },
}));

jest.mock("../../src/helpers/validation", () => ({
  validatePost: jest.fn(),
}));

jest.mock("../../src/helpers/cryptoList", () => ({
  encryptData: jest.fn(
    (iv: string, value: string) => `encrypted:${iv}:${value}`,
  ),
  decryptList: jest.fn((iv: string, list: Array<Record<string, unknown>>) =>
    list.map((item) => ({
      ...(item as Record<string, unknown>),
      decrypted: true,
      iv,
    })),
  ),
}));

describe("Password controller", () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST /api/passwords should create a password entry when validation passes", async () => {
    (validatePost as jest.Mock).mockReturnValue({ error: null });
    (User.findOne as jest.Mock).mockResolvedValue({ user_IV: "iv123" });
    (Password.findOne as jest.Mock).mockResolvedValue(null);
    (Password.findOneAndUpdate as jest.Mock).mockResolvedValue({ ok: 1 });

    const req: any = {
      body: {
        app_name: "GitHub",
        app_username: "octocat",
        app_password: "secret",
      },
      user: { _id: "user-1" },
    };
    const res = mockRes();

    await createPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: 1 });
    expect(Password.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(encryptData).toHaveBeenCalled();
  });

  it("POST /api/passwords should return 400 when validation fails", async () => {
    (validatePost as jest.Mock).mockReturnValue({
      error: { message: "bad input" },
    });

    const req: any = { body: {}, user: { _id: "user-1" } };
    const res = mockRes();

    await createPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: "bad input" });
  });

  it("GET /api/passwords should return decrypted passwords for the authenticated user", async () => {
    (Password.findOne as jest.Mock).mockResolvedValue({
      collections: [{ app_name: "GitHub" }],
    });
    (User.findOne as jest.Mock).mockResolvedValue({ user_IV: "iv123" });
    (decryptList as jest.Mock).mockReturnValue([
      { app_name: "GitHub", decrypted: true },
    ]);

    const req: any = { user: { _id: "user-1" } };
    const res = mockRes();

    await getPasswords(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      passwordsList: [{ app_name: "GitHub", decrypted: true }],
    });
  });

  it("PATCH /api/passwords/:id should update a password entry and encrypt the new values", async () => {
    (validatePost as jest.Mock).mockReturnValue({ error: null });
    (User.findOne as jest.Mock).mockResolvedValue({ user_IV: "iv123" });
    (Password.findOne as jest.Mock).mockResolvedValue({ user_id: "user-1" });
    (Password.updateOne as jest.Mock).mockResolvedValue({ ok: 1 });

    const req: any = {
      body: {
        _id: "collection-1",
        app_name: "Slack",
        app_username: "dev@example.com",
        app_password: "new-secret",
      },
      user: { _id: "user-1" },
    };
    const res = mockRes();

    await updatePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: 1 });
    expect(encryptData).toHaveBeenCalled();
    expect(Password.updateOne).toHaveBeenCalledTimes(1);
  });

  it("DELETE /api/passwords/:id should return 400 when the target collection does not exist", async () => {
    (Password.findOne as jest.Mock).mockResolvedValue(null);

    const req: any = {
      params: { id: "collection-1" },
      user: { _id: "user-1" },
    };
    const res = mockRes();

    await deletePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Collection Not Find!");
  });

  it("DELETE /api/passwords/:id should remove an existing password collection", async () => {
    (Password.findOne as jest.Mock).mockResolvedValue({ user_id: "user-1" });
    (Password.updateOne as jest.Mock).mockResolvedValue({ ok: 1 });

    const req: any = {
      params: { id: "collection-1" },
      user: { _id: "user-1" },
    };
    const res = mockRes();

    await deletePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: 1 });
    expect(Password.updateOne).toHaveBeenCalledTimes(1);
  });
});
