// Import necessary modules and types
import { NextRequest } from "next/server"; // Import Next.js request type
import { prisma } from "@/lib/prisma"; // Import Prisma client instance
import { z } from "zod"; // Import Zod for schema validation
import { handleApi } from "@/lib/apiWrapper"; // Import API wrapper utility

// Define a schema for validating the update operation using Zod
const updateSchema = z.object({
  score: z.number().int(), // Ensure the score is an integer number
});

// Define an asynchronous PUT function to handle HTTP PUT requests
export async function PUT(
  req: NextRequest, // Incoming request object
  { params }: { params: { id: string } } // Destructure parameters to extract player ID
) {
  // Use handleApi utility function, passing an asynchronous callback
  return handleApi(async () => {
    // Parse the JSON object from the incoming request body
    const body = await req.json();

    // Validate and parse the request data against the defined schema
    const data = updateSchema.parse(body);

    // Update the player's score in the database using Prisma client
    const updated = await prisma.player.update({
      where: { id: params.id }, // Target player by ID
      data: { score: data.score }, // Update score with validated data
    });

    // Return the updated player object
    return updated;
  });
}

// Define an asynchronous DELETE function to handle HTTP DELETE requests
export async function DELETE(
  _: NextRequest, // Incoming request object (underscore used to ignore parameter)
  { params }: { params: { id: string } } // Destructure parameters to extract player ID
) {
  // Use handleApi utility function for error handling or response formatting
  return handleApi(() =>
    // Delete the player record from the database using Prisma client
    prisma.player.delete({
      where: { id: params.id }, // Target player by ID
    })
  );
}
