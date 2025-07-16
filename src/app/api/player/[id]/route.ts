import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma"; // Import the Prisma client to interact with the database
import { z } from "zod"; // Import Zod for schema validation
import { handleApi } from "@/lib/apiWrapper"; // Import a utility to handle API requests

// Define a schema using Zod to validate that 'score' is an integer in the request body
const updateSchema = z.object({
  score: z.number().int(),
});

// Define a type alias for function parameter context, representing an ID wrapped in a Promise
type Params = Promise<{ id: string }>;

/**
 * Handles HTTP PUT requests to update a player's score.
 *
 * @param req - The incoming request object.
 * @param context - Contains parameters, specifically the player ID.
 * @returns A promise that resolves to a Response object.
 */
export async function PUT(
  req: NextRequest,
  context: { params: Params }
): Promise<Response> {
  return handleApi(async () => {
    // Destructure and await the ID from the context parameters
    const { id } = await context.params;

    // Parse the JSON body of the request
    const body = await req.json();

    // Validate the parsed data against the updateSchema
    const data = updateSchema.parse(body);

    // Perform the update operation in the database using Prisma
    const updated = await prisma.player.update({
      where: { id },
      data: { score: data.score },
    });

    // Return the updated player data as a JSON response
    return Response.json(updated);
  });
}

/**
 * Handles HTTP DELETE requests to remove a player record.
 *
 * @param req - The incoming request object.
 * @param context - Contains parameters, specifically the player ID.
 * @returns A promise that resolves to a Response object.
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Params }
): Promise<Response> {
  return handleApi(async () => {
    // Destructure and await the ID from the context parameters
    const { id } = await context.params;

    // Perform the delete operation in the database using Prisma
    await prisma.player.delete({
      where: { id },
    });

    // Return a confirmation message as a JSON response
    return Response.json({ message: "Player deleted" });
  });
}
