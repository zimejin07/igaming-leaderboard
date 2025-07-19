// Import necessary modules and functions from Next.js and Prisma client
import { handleApi } from "@/lib/apiWrapper";
import prisma from "@/lib/prisma";

// Import necessary modules and functions from Next.js, Prisma client, and Zod for validation
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(): Promise<Response> {
  try {
    // Fetch the top 10 players ordered by score in descending order from the database
    const players = await prisma.player.findMany({
      orderBy: { score: "desc" }, // Order players by their score, highest first
      take: 10, // Limit the results to the top 10 players
    });

    // Return the list of players as a JSON response
    return Response.json(players);
  } catch (error) {
    // Log any errors to the console, tagged with the endpoint for easier debugging
    console.error("[GET /api/player]", error);

    // Return an error message and a 500 status code if an exception occurs
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Define a schema using Zod for input validation
const postSchema = z.object({
  name: z.string().min(1), // Name must be a non-empty string
  score: z.number().int().nonnegative(), // Score must be a non-negative integer
});

// Define an asynchronous POST function to handle HTTP POST requests
export async function POST(req: NextRequest) {
  // Use handleApi utility function, passing an asynchronous callback
  return handleApi(async () => {
    // Parse the JSON object from the incoming request body
    const body = await req.json();

    // Validate and parse the request data using a predefined schema (postSchema)
    const data = postSchema.parse(body);

    // Create a new player entry in the database using Prisma client
    const newPlayer = await prisma.player.create({
      data: {
        name: data.name,
        score: data.score,
      },
    });

    // Return the newly created player object
    return newPlayer;
  });
}
