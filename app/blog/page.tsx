"use client"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { BlueGradientCircle } from "@/components/ui-elements"
import BlogPostCard from "@/components/blog-post-card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { blogService, type BlogPost } from "@/lib/blog-service"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All Posts")

  useEffect(() => {
    setPosts(blogService.getPublishedPosts())
    setIsLoading(false)
  }, [])

  // Get unique categories from posts
  const categories = ["All Posts", ...Array.from(new Set(posts.map((post) => post.category)))]

  // Filter posts by category
  const filteredPosts =
    activeCategory === "All Posts" ? posts : posts.filter((post) => post.category === activeCategory)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

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
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={
                    activeCategory === category ? "bg-blue-500 hover:bg-blue-600 rounded-full" : "rounded-full"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="container py-8 md:py-16">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500">No posts found</h3>
              <p className="mt-2 text-gray-400">
                {activeCategory === "All Posts"
                  ? "There are no blog posts yet"
                  : `No posts found in the ${activeCategory} category`}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
