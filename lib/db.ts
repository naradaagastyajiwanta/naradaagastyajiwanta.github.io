import { neon } from "@neondatabase/serverless"

// Create a SQL client with the connection string from environment variables
export const sql = neon(process.env.DATABASE_URL!)

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
