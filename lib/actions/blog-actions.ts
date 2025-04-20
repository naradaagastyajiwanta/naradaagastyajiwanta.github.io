"use server"

import { sql, generateSlug } from "@/lib/db"
import { calculateReadTime } from "@/lib/blog-utils"
import { revalidatePath } from "next/cache"

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string
  author: string
  category: string
  status: "published" | "draft"
  read_time: string
  created_at: Date
  updated_at: Date
}

export interface BlogPostInput {
  title: string
  content: string
  excerpt?: string
  cover_image?: string
  author: string
  category: string
  status: "published" | "draft"
}

// Get all published blog posts
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await sql<BlogPost[]>`
    SELECT * FROM blog_posts 
    WHERE status = 'published' 
    ORDER BY created_at DESC
  `

  return posts
}

// Get all blog posts (published and drafts)
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await sql<BlogPost[]>`
    SELECT * FROM blog_posts 
    ORDER BY created_at DESC
  `

  return posts
}

// Get a blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await sql<BlogPost[]>`
    SELECT * FROM blog_posts 
    WHERE slug = ${slug}
    LIMIT 1
  `

  return posts.length > 0 ? posts[0] : null
}

// Get a blog post by ID
export async function getPostById(id: number): Promise<BlogPost | null> {
  const posts = await sql<BlogPost[]>`
    SELECT * FROM blog_posts 
    WHERE id = ${id}
    LIMIT 1
  `

  return posts.length > 0 ? posts[0] : null
}

// Create a new blog post
export async function createPost(post: BlogPostInput): Promise<BlogPost> {
  const slug = generateSlug(post.title)
  const readTime = calculateReadTime(post.content)
  const excerpt = post.excerpt || post.content.substring(0, 150) + "..."

  const result = await sql<BlogPost[]>`
    INSERT INTO blog_posts (
      title, slug, content, excerpt, cover_image, 
      author, category, status, read_time
    ) VALUES (
      ${post.title}, ${slug}, ${post.content}, ${excerpt}, ${post.cover_image || null}, 
      ${post.author}, ${post.category}, ${post.status}, ${readTime}
    )
    RETURNING *
  `

  revalidatePath("/blog")
  revalidatePath("/admin")

  return result[0]
}

// Update an existing blog post
export async function updatePost(id: number, post: Partial<BlogPostInput>): Promise<BlogPost | null> {
  // First get the existing post
  const existingPost = await getPostById(id)
  if (!existingPost) return null

  // Prepare update fields
  const updates: Record<string, any> = {}
  let newSlug = existingPost.slug

  if (post.title && post.title !== existingPost.title) {
    updates.title = post.title
    newSlug = generateSlug(post.title)
    updates.slug = newSlug
  }

  if (post.content && post.content !== existingPost.content) {
    updates.content = post.content
    updates.read_time = calculateReadTime(post.content)

    // Update excerpt if not explicitly provided
    if (!post.excerpt && (!existingPost.excerpt || existingPost.excerpt.includes("..."))) {
      updates.excerpt = post.content.substring(0, 150) + "..."
    }
  }

  if (post.excerpt) updates.excerpt = post.excerpt
  if (post.cover_image !== undefined) updates.cover_image = post.cover_image || null
  if (post.author) updates.author = post.author
  if (post.category) updates.category = post.category
  if (post.status) updates.status = post.status

  updates.updated_at = new Date()

  // Build the SQL query dynamically
  const setClause = Object.entries(updates)
    .map(([key, value]) => `${key} = ${value === null ? "NULL" : `'${value}'`}`)
    .join(", ")

  // Execute the update
  const result = await sql<BlogPost[]>`
    UPDATE blog_posts
    SET ${sql.raw(setClause)}
    WHERE id = ${id}
    RETURNING *
  `

  revalidatePath("/blog")
  revalidatePath(`/blog/${newSlug}`)
  revalidatePath("/admin")

  return result.length > 0 ? result[0] : null
}

// Delete a blog post
export async function deletePost(id: number): Promise<boolean> {
  const result = await sql`
    DELETE FROM blog_posts
    WHERE id = ${id}
    RETURNING id
  `

  revalidatePath("/blog")
  revalidatePath("/admin")

  return result.length > 0
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await sql<BlogPost[]>`
    SELECT * FROM blog_posts 
    WHERE category = ${category} AND status = 'published'
    ORDER BY created_at DESC
  `

  return posts
}

// Get latest posts (limit by count)
export async function getLatestPosts(count = 3): Promise<BlogPost[]> {
  const posts = await sql<BlogPost[]>`
    SELECT * FROM blog_posts 
    WHERE status = 'published'
    ORDER BY created_at DESC
    LIMIT ${count}
  `

  return posts
}

// Get related posts (same category, excluding current post)
export async function getRelatedPosts(postId: number, category: string, limit = 2): Promise<BlogPost[]> {
  const posts = await sql<BlogPost[]>`
    SELECT * FROM blog_posts 
    WHERE category = ${category} 
    AND id != ${postId}
    AND status = 'published'
    ORDER BY created_at DESC
    LIMIT ${limit}
  `

  return posts
}
