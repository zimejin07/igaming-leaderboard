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

  // Test case for updating a player's score using the PUT method.
  it("PUT updates a player's score", async () => {
    // Retrieve the first player record with the name "Bob" from the database.
    const player = await prisma.player.findFirst({ where: { name: "Bob" } });

    // If a player with the name "Bob" is found, perform a PUT request to update their score.
    const res = await request(baseUrl)
      .put(`/api/player/${player?.id}`) // Construct the API endpoint using the player's ID.
      .send({ score: 150 }) // Send the new score (150) in the request body.
      .set("Content-Type", "application/json"); // Set the correct content type for the request.

    // Expect the HTTP status of the response to be 200, indicating success.
    expect(res.status).toBe(200);
    // Expect the updated score in the response body to match the new score (150).
    expect(res.body.score).toBe(150);
  });

  it("DELETE removes a player", async () => {
  const player = await prisma.player.findFirst({ where: { name: "Charlie" } });

  const res = await request(baseUrl).delete(`/api/player/${player?.id}`);
  expect(res.status).toBe(200);

  const deleted = await prisma.player.findUnique({ where: { id: player?.id } });
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
