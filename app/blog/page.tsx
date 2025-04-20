import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { BlueGradientCircle } from "@/components/ui-elements"
import BlogPostCard from "@/components/blog-post-card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPublishedPosts, getPostsByCategory } from "@/lib/actions/blog-actions"

interface BlogPageProps {
  searchParams: { category?: string }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Decorative Elements */}
      <BlueGradientCircle position="left" size="lg" opacity={0.2} />
      <BlueGradientCircle position="right" size="lg" opacity={0.2} />

      <Header />

      <main className="flex-1">
        {/* Blog Header */}
        <section className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Video Editing <span className="text-blue-500">Insights</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8">
              Tips, tutorials, and thoughts on the art and craft of video editing
            </p>
            <Suspense fallback={<div>Loading categories...</div>}>
              <CategoryFilter activeCategory={searchParams.category} />
            </Suspense>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="container py-8 md:py-16">
          <Suspense fallback={<div className="text-center py-12">Loading posts...</div>}>
            <BlogPosts category={searchParams.category} />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  )
}

async function CategoryFilter({ activeCategory }: { activeCategory?: string }) {
  // Get all posts to extract categories
  const posts = await getPublishedPosts()

  // Extract unique categories
  const categories = ["All Posts", ...Array.from(new Set(posts.map((post) => post.category)))]

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category || (!activeCategory && category === "All Posts") ? "default" : "outline"}
          className={
            activeCategory === category || (!activeCategory && category === "All Posts")
              ? "bg-blue-500 hover:bg-blue-600 rounded-full"
              : "rounded-full"
          }
          asChild
        >
          <a href={category === "All Posts" ? "/blog" : `/blog?category=${category}`}>{category}</a>
        </Button>
      ))}
    </div>
  )
}

async function BlogPosts({ category }: { category?: string }) {
  // Get posts based on category filter
  const posts = category ? await getPostsByCategory(category) : await getPublishedPosts()

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-500">No posts found</h3>
        <p className="mt-2 text-gray-400">
          {category ? `No posts found in the ${category} category` : "There are no blog posts yet"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
