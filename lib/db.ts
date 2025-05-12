import { neon } from "@neondatabase/serverless"

// Check if DATABASE_URL is available
const databaseUrl = process.env.DATABASE_URL || ""

// Create a SQL client with proper error handling
export const sql = (() => {
  try {
    // Check if we're in a development environment without a DATABASE_URL
    if (!databaseUrl) {
      console.warn("DATABASE_URL is not defined. Using mock SQL client.")
      // Return a mock SQL client for development
      return async (query: string, params?: any[]) => {
        console.log(`Mock SQL query: ${query}`, params)
        return []
      }
    }

    // Create the real SQL client
    return neon(databaseUrl)
  } catch (error) {
    console.error("Failed to initialize database connection:", error)
    // Return a fallback function that logs errors but doesn't crash
    return async (query: string, params?: any[]) => {
      console.error(`Failed to execute query: ${query}`, params, error)
      return []
    }
  }
})()

// Helper function to format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Helper to generate a slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}
