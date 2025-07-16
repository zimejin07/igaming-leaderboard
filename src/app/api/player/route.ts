// Import necessary modules and functions from Next.js and Prisma client
import { handleApi } from "@/lib/apiWrapper";
import prisma from "@/lib/prisma";

// Import necessary modules and functions from Next.js, Prisma client, and Zod for validation
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define an asynchronous function to handle GET requests
export async function GET() {
  // Fetch the top 10 players ordered by their score in descending order
  const topPlayers = await prisma.player.findMany({
    orderBy: { score: "desc" },
    take: 10,
  });
  // Return the fetched players as a JSON response
  return NextResponse.json(topPlayers);
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
        name: data.name, // Assign player's name from parsed data
        score: data.score, // Assign player's score from parsed data
      },
    });

    // Return the newly created player object
    return newPlayer;
  });
}
