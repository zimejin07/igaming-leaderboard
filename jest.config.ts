// Importing the Config type from jest to ensure the config object adheres to the expected shape.
import type { Config } from "jest";

// Define a configuration object for the testing framework
const config: Config = {
  // Specify the preset to be used by Jest, 'ts-jest' is used for TypeScript support
  preset: "ts-jest",

  // Set the environment in which the tests will run; 'node' indicates a Node.js environment
  testEnvironment: "node",

  // Define patterns Jest uses to detect test files
  testMatch: ["**/tests/**/*.test.ts"], // Matches all .test.ts files within any tests folder

  // Specify file extensions that Jest will scan for tests and modules
  moduleFileExtensions: ["ts", "js"], // Allow both TypeScript (.ts) and JavaScript (.js) files

  transform: {
    // Use ts-jest to transpile TypeScript files for testing.
    "^.+.ts$": "ts-jest",
  },

  // Scripts or modules to run before each test file is executed
  setupFiles: ["<rootDir>/tests/setup-env.ts"], // Path to initial setup file for test environment
};

// Exporting the configuration object so it can be used by Jest
export default config;
