// Import necessary modules and functions from Next.js and Prisma client
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
const schema = z.object({
  name: z.string().min(1), // Name must be a non-empty string
  score: z.number().int().nonnegative(), // Score must be a non-negative integer
});

// Define an asynchronous function to handle POST requests
export async function POST(req: NextRequest) {
  try {
    // Parse the request body as JSON
    const body = await req.json();
    // Validate the parsed data against the defined schema
    const data = schema.parse(body);

    // Create a new player record in the database with the validated data
    const player = await prisma.player.create({
      data: {
        name: data.name,
        score: data.score,
      },
    });

    // Return the created player as a JSON response with status code 201 (Created)
    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    // Handle any errors during parsing or validation
    // Return an error message as JSON response with status code 400 (Bad Request)
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
