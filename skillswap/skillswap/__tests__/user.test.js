// __tests__/user.test.js
const request = require("supertest");
const app = require("../app"); // ✅ must be app.js

describe("User API", () => {
  it("should respond to GET /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Welcome to SkillSwap API");
  });
});
