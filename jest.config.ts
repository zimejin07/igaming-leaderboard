import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"], // Matches all .test.ts files within any tests folder
  moduleFileExtensions: ["ts", "js"], // Allow both TypeScript (.ts) and JavaScript (.js) files

  transform: {
    // Use babel-jest with next/babel presets to transpile
    // both TypeScript and JavaScript files for testing.
    "^.+.(ts|tsx|js|jsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },

  // The moduleNameMapper is a configuration option used in Jest to resolve module paths.
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // pathsToModuleNameMapper is a utility function from the 'ts-jest' library that allows
    // the conversion of TypeScript's "paths" mappings in the tsconfig.json file into Jest's
    // module name mapping format.
    prefix: "<rootDir>/",
  }),

  setupFiles: ["<rootDir>/tests/setup-env.ts"], // Path to initial setup file for test environment
};

export default config;
