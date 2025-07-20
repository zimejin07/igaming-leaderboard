import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApi } from "@/lib/apiWrapper";

const SECRET = process.env.SEED_SECRET || "demo123";

export async function POST(req: NextRequest) {
  return handleApi(async () => {
    const url = new URL(req.url);

    if (url.searchParams.get("token") !== SECRET) {
      // Throw an error if token does not match
      throw new Error("Unauthorized");
    }

    // Delete all existing player records from the database using Prisma client
    await prisma.player.deleteMany();

    await prisma.player.createMany({
      data: [
        { name: "Alice", score: 120 },
        { name: "Bob", score: 100 },
        { name: "Charlie", score: 90 },
        { name: "Diana", score: 80 },
        { name: "Eve", score: 70 },
      ],
    });

    return { status: "Seeded" };
  });
}
