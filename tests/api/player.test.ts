import request from "supertest";
import { prisma } from "@/lib/prisma";

const baseUrl = "http://localhost:3000";

describe("/api/player", () => {
  beforeAll(async () => {
    await prisma.player.deleteMany();

    await prisma.player.createMany({
      data: [
        { name: "Alice", score: 120 },
        { name: "Bob", score: 90 },
      ],
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("GET returns top 10 players", async () => {
    const res = await request(baseUrl).get("/api/player");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(res.body[0]).toHaveProperty("name");
  });

  it("POST adds a new player", async () => {
    const res = await request(baseUrl)
      .post("/api/player")
      .send({ name: "Charlie", score: 100 })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Charlie");
  });

  it("POST fails with bad input", async () => {
    const res = await request(baseUrl)
      .post("/api/player")
      .send({ name: "", score: -10 }) 
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("PUT updates a player's score", async () => {
    const player = await prisma.player.findFirst({ where: { name: "Bob" } });

    const res = await request(baseUrl)
      .put(`/api/player/${player?.id}`)
      .send({ score: 150 })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.score).toBe(150);
  });

  it("DELETE removes a player", async () => {
    const player = await prisma.player.findFirst({
      where: { name: "Charlie" },
    });

    const res = await request(baseUrl).delete(`/api/player/${player?.id}`);
    expect(res.status).toBe(200);

    const deleted = await prisma.player.findUnique({
      where: { id: player?.id },
    });
    expect(deleted).toBeNull();
  });

  it("PUT fails with invalid score", async () => {
    const player = await prisma.player.findFirst();

    const res = await request(baseUrl)
      .put(`/api/player/${player?.id}`)
      .send({ score: -50 })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });
});
