import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.player.createMany({
    data: [
      { name: "Alice", score: 120 },
      { name: "Bob", score: 95 },
      { name: "Charlie", score: 110 },
      { name: "Diana", score: 80 },
      { name: "Eve", score: 100 },
      { name: "Frank", score: 70 },
      { name: "Grace", score: 115 },
      { name: "Henry", score: 105 },
      { name: "Isla", score: 130 },
      { name: "Jack", score: 90 },
    ],
  });
  console.log("Seeded players.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
