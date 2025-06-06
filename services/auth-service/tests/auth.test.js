import request from "supertest";
import express from "express";
import * as authController from "../src/controllers/auth.controller.js";
import { supabase } from "../src/services/supabase";
import { generateToken } from "../src/services/utils";
import bcrypt from "bcrypt";


jest.mock("../src/services/supabase.js");
jest.mock("../src/services/utils.js", () => ({
  generateToken: jest.fn(() => "mock-jwt-token")
}));

const app = express();
app.use(express.json());
app.post("/signup", authController.signup);
app.post("/login", authController.login);
app.post("/logout", authController.logout);

describe("Auth Controller", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Signup", () => {
    it("should return 400 if email or password is missing", async () => {
      const res = await request(app).post("/signup").send({ email: "" });
      expect(res.statusCode).toBe(400);
    });

    it("should return 409 if email already exists", async () => {
      supabase.from.mockReturnValue({
        select: () => ({
          eq: () => ({
            single: () => ({ data: { email: "test@example.com" }, error: null })
          })
        })
      });

      const res = await request(app)
        .post("/signup")
        .send({ email: "test@example.com", password: "test1234" });

      expect(res.statusCode).toBe(409);
    });

    it("should return 201 for successful signup", async () => {
      supabase.from.mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            single: () => ({ data: null, error: null })
          })
        })
      });

      supabase.auth = {
        signUp: jest.fn().mockResolvedValue({
          data: { user: { id: "1", email: "test@example.com" } },
          error: null
        })
      };

      const res = await request(app)
        .post("/signup")
        .send({ email: "test@example.com", password: "test1234" });

      expect(res.statusCode).toBe(201);
      expect(res.body.user.email).toBe("test@example.com");
    });
  });

  describe("Login", () => {
    it("should return 400 if email or password is missing", async () => {
      const res = await request(app).post("/login").send({ email: "" });
      expect(res.statusCode).toBe(400);
    });

    it("should return 401 if user not found", async () => {
      supabase.from.mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            single: () => ({ data: null, error: "User not found" })
          })
        })
      });

      const res = await request(app)
        .post("/login")
        .send({ email: "missing@example.com", password: "pass" });

      expect(res.statusCode).toBe(401);
    });

    it("should return 401 if password is incorrect", async () => {
      supabase.from.mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            single: async () => ({
              data: { email: "test@example.com", password: await bcrypt.hash("correct", 10) },
              error: null
            })
          })
        })
      });

      const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "wrong" });

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 if login is successful", async () => {
      const hashed = await bcrypt.hash("test123", 10);

      supabase.from.mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            single: () => ({
              data: { id: "1", email: "test@example.com", password: hashed },
              error: null
            })
          })
        })
      });

      const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "test123" });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBe("mock-jwt-token");
    });
  });

  describe("Logout", () => {
    it("should clear the jwt cookie", async () => {
      const res = await request(app).post("/logout");
      expect(res.statusCode).toBe(200);
    });
  });
});