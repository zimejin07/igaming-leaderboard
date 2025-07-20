import { handleApi } from "@/lib/apiWrapper";
import prisma from "@/lib/prisma";

import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(): Promise<Response> {
  try {
    const players = await prisma.player.findMany({
      orderBy: { score: "desc" },
      take: 10,
      distinct: ["name"],
    });

    return Response.json(players);
  } catch (error) {
    console.error("[GET /api/player]", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Define a schema using Zod for input validation
const postSchema = z.object({
  name: z.string().min(1), // Name must be a non-empty string
  score: z.number().int().nonnegative(),
});

export async function POST(req: NextRequest) {
  return handleApi(async () => {
    const body = await req.json();

    const data = postSchema.parse(body);

    const newPlayer = await prisma.player.create({
      data: {
        name: data.name,
        score: data.score,
      },
    });

    return newPlayer;
  });
}
