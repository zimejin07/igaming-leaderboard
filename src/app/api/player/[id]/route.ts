import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z, ZodError } from "zod";
import { handleApi } from "@/lib/apiWrapper";

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
    try {
      const { id } = await context.params;
      const body = await req.json();

      const player = await prisma.player.findUnique({ where: { id } });
      if (!player) {
        return Response.json({ error: "Player not found" }, { status: 404 });
      }

      const data = updateSchema.parse(body);

      const updated = await prisma.player.update({
        where: { id },
        data: { score: data.score },
      });

      return Response.json(updated);
    } catch (err) {
      if (err instanceof ZodError) {
        return Response.json({ error: err.message }, { status: 400 });
      }

      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
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
