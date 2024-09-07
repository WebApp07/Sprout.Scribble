import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from the `.env.local` file
dotenv.config({ path: ".env.local" });

// Ensure POSTGRES_URL is correctly set
if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not defined");
}

// Export the configuration
export default defineConfig({
  schema: "./server/schema.ts",
  out: "./server/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL, // Ensure that POSTGRES_URL is set
  },
});
