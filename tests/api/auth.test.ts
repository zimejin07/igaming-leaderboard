import request from "supertest";
const baseUrl = "http://web:3000";

describe("Middleware Auth Redirect", () => {
  it("redirects unauthenticated user from /admin", async () => {
    const res = await request(baseUrl).get("/admin");

    expect(res.status).toBeGreaterThanOrEqual(300);
    expect(res.status).toBeLessThan(400);
    expect(res.headers.location).toBe("/login");
  });
});
