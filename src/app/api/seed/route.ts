// Import necessary modules and types
import { NextRequest } from "next/server"; 
import { prisma } from "@/lib/prisma";
import { handleApi } from "@/lib/apiWrapper";

// Define a constant for the secret token used for authorization
const SECRET = process.env.SEED_SECRET || "demo123"; // Default to 'demo123' if not set in environment variables

// Define an asynchronous POST function to handle HTTP POST requests
export async function POST(req: NextRequest) {
  // Use handleApi utility function, passing an asynchronous callback
  return handleApi(async () => {
    // Create a URL object from the request URL
    const url = new URL(req.url);

    // Check if the query parameter 'token' matches the predefined SECRET
    if (url.searchParams.get("token") !== SECRET) {
      // Throw an error if token does not match
      throw new Error("Unauthorized");
    }

    // Delete all existing player records from the database using Prisma client
    await prisma.player.deleteMany();

    // Insert multiple player records into the database
    await prisma.player.createMany({
      data: [
        { name: "Alice", score: 120 },
        { name: "Bob", score: 100 },
        { name: "Charlie", score: 90 },
        { name: "Diana", score: 80 },
        { name: "Eve", score: 70 },
      ],
    });

    // Return a confirmation response indicating seeding completion
    return { status: "Seeded" };
  });
}
