import request from "supertest";
import { prisma } from "@/lib/prisma";

const baseUrl = "http://web:3000";

describe("/api/player", () => {
  beforeAll(async () => {
    try {
      await prisma.player.deleteMany();

      await prisma.player.createMany({
        data: [
          { name: "Alice", score: 120 },
          { name: "Bob", score: 90 },
        ],
      });
    } catch (error) {
      console.error("Error in beforeAll:", error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await prisma.$disconnect();
    } catch (error) {
      console.error("Error in afterAll:", error);
      throw error;
    }
  });

  it("GET returns top 10 players", async () => {
    try {
      const res = await request(baseUrl).get("/api/player");

      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
      expect(res.body[0]).toHaveProperty("name");
    } catch (error) {
      console.error("Error in GET test:", error);
      throw error;
    }
  });

  it("POST adds a new player", async () => {
    try {
      const res = await request(baseUrl)
        .post("/api/player")
        .send({ name: "Charlie", score: 100 })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Charlie");
    } catch (error) {
      console.error("Error in POST new player test:", error);
      throw error;
    }
  });

  it("POST fails with bad input", async () => {
    try {
      const res = await request(baseUrl)
        .post("/api/player")
        .send({ name: "", score: -10 })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(500);
    } catch (error) {
      console.error("Error in POST bad input test:", error);
      throw error;
    }
  });

  it.skip("PUT updates a player's score", async () => {
    try {
      const player = await prisma.player.findFirst({
        where: { name: "Bob" },
      });

      if (!player) throw new Error("Player not found");

      const res = await request(baseUrl)
        .put(`/api/player/${player.id}`)
        .send({ score: 150 })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.score).toBe(150);
    } catch (error) {
      console.error("Error in PUT update score test:", error);
      throw error;
    }
  });

  it.skip("DELETE removes a player", async () => {
    try {
      await prisma.player.create({
        data: { name: "Charlie", score: 100 },
      });
      const player = await prisma.player.findFirst({
        where: { name: "Charlie" },
      });

      if (!player) throw new Error("Player not found");

      const res = await request(baseUrl).delete(`/api/player/${player.id}`);
      expect(res.status).toBe(200);

      const deleted = await prisma.player.findUnique({
        where: { id: player.id },
      });
      expect(deleted).toBeNull();
    } catch (error) {
      console.error("Error in DELETE test:", error);
      throw error;
    }
  });

  it.skip("PUT fails with invalid score", async () => {
    try {
      const player = await prisma.player.findFirst();

      if (!player) throw new Error("Player not found");

      const res = await request(baseUrl)
        .put(`/api/player/${player.id}`)
        .send({ score: -50 })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(500);
    } catch (error) {
      console.error("Error in PUT invalid score test:", error);
      throw error;
    }
  });
});
