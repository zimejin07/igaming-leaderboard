import { z } from "zod";

// Defines a schema for environment variables using Zod, a TypeScript-first schema declaration and validation library.
// Loads & validates env vars	Used in runtime code
const envSchema = z.object({
  // Validates that 'DATABASE_URL' is a valid URL format string, which typically specifies the database connection string.
  DATABASE_URL: z.url(),

  // Ensures that 'NODE_ENV' is one of the specific string literals "development", "production", or "test".
  // This variable indicates the current environment in which the application is running.
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse(process.env);
