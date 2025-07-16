// Import the 'supertest' module for HTTP assertions and requests
import request from "supertest";

// Import the Prisma client instance to interact with the database
import { prisma } from "@/lib/prisma";

// Define the base URL for making requests to the local Next.js app
const baseUrl = "http://localhost:3000";

// Start a test suite for the '/api/player' endpoint
describe("/api/player", () => {
  // Run setup operations before any tests in this suite execute
  beforeAll(async () => {
    // Delete all records from the 'player' table in the database
    await prisma.player.deleteMany();

    // Insert sample player data into the database
    await prisma.player.createMany({
      data: [
        { name: "Alice", score: 120 },
        { name: "Bob", score: 90 },
      ],
    });
  });

  // Run cleanup operations after all tests in this suite finish
  afterAll(async () => {
    // Disconnect Prisma to ensure clean shutdown of the database connection
    await prisma.$disconnect();
  });

  // Test the GET method to fetch top players
  it("GET returns top 10 players", async () => {
    // Send a GET request to '/api/player'
    const res = await request(baseUrl).get("/api/player");

    // Expect the response status code to be 200 (OK)
    expect(res.status).toBe(200);

    // Validate that at least two players are returned in the response body
    expect(res.body.length).toBeGreaterThanOrEqual(2);

    // Check if the first player object has a 'name' property
    expect(res.body[0]).toHaveProperty("name");
  });

  // Test the POST method to add a new player
  it("POST adds a new player", async () => {
    // Send a POST request with player data to '/api/player'
    const res = await request(baseUrl)
      .post("/api/player")
      .send({ name: "Charlie", score: 100 }) // New player data
      .set("Content-Type", "application/json");

    // Expect the response status code to be 201 (Created)
    expect(res.status).toBe(201);

    // Validate that the response includes the newly added player's name
    expect(res.body.name).toBe("Charlie");
  });

  // Test the POST method with invalid data input
  it("POST fails with bad input", async () => {
    // Send a POST request with invalid player data to '/api/player'
    const res = await request(baseUrl)
      .post("/api/player")
      .send({ name: "", score: -10 }) // Invalid data
      .set("Content-Type", "application/json");

    // Expect the response status code to be 400 (Bad Request)
    expect(res.status).toBe(400);
  });
});
