// Import the PrismaClient class from the '@prisma/client' package
import { PrismaClient } from "@prisma/client";

// Define a global variable for storing a PrismaClient instance in a node's globalThis object
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined; // Type definition allowing the prisma property to be either a PrismaClient instance or undefined
};

// Export a singleton instance of PrismaClient
export const prisma =
  globalForPrisma.prisma ?? // Use existing prisma instance if available in globalForPrisma
  new PrismaClient({
    log: ["query"], // Instantiate a new PrismaClient with query logging enabled
  });

// If not running in a production environment, store the PrismaClient instance globally
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Default export of the PrismaClient instance for use in other parts of the application
export default prisma;
