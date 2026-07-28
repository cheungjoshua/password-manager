// Mock server for testing
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authMiddleware from "../src/middleware/verifyToken";

const app: express.Express = express();

// Extend Request type to include user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  if (
    req.path === "/users/signup" ||
    req.path === "/users/login/" ||
    req.path === "/users/login"
  ) {
    return next();
  }

  return authMiddleware(req, res, next);
});

// Mock signup route
app.post("/users/signup", (req: Request, res: Response) => {
  // Simulate validation
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!req.body.email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (req.body.password.length < 6) {
    return res.status(400).json({ error: "Password too short" });
  }
  if (req.body.username.length < 6) {
    return res.status(400).json({ error: "Username too short" });
  }

  // Success response
  return res.status(200).json({
    email: req.body.email,
    username: req.body.username,
    password: "hashed",
    user_IV: "iv",
  });
});

// Test endpoint for auth middleware
app.get("/test", (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    return res.status(200).json({
      message: "User authenticated successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  }
  return res.status(401).json({ error: "Not authenticated" });
});

// Mock login route
app.post("/users/login/", (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!req.body.email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (req.body.password.length < 6) {
    return res.status(400).json({ error: "Password too short" });
  }

  // Simulate invalid credentials
  return res.status(401).json({ message: "Invalid password" });
});

export { app };
export default app;
