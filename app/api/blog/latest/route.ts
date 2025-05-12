import { NextResponse } from "next/server"
import { getLatestPosts } from "@/lib/actions/blog-actions"

export async function GET(request: Request) {
  try {
    // Get the URL object
    const url = new URL(request.url)

    // Get the limit parameter, default to 3
    const limit = Number.parseInt(url.searchParams.get("limit") || "3", 10)

    // Get the latest posts
    const posts = await getLatestPosts(limit)

    // Return the posts
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching latest posts:", error)
    return NextResponse.json({ error: "Failed to fetch latest posts" }, { status: 500 })
  }
}
