import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { BlueGradientCircle, GlassmorphicCard } from "@/components/ui-elements"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FallbackImage from "@/components/fallback-image"
import { getPostBySlug, getRelatedPosts } from "@/lib/actions/blog-actions"
import { formatDate } from "@/lib/db"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPosts = await getRelatedPosts(post.id, post.category)

  // Format the date for display
  const displayDate = post.created_at ? formatDate(new Date(post.created_at)) : ""

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Decorative Elements */}
      <BlueGradientCircle position="left" size="lg" opacity={0.2} />
      <BlueGradientCircle position="right" size="lg" opacity={0.2} />

      <Header />

      <main className="flex-1">
        {/* Blog Post Header */}
        <section className="container py-16">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all articles
              </Button>
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {displayDate}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {post.category}
                </div>
                <div>{post.read_time}</div>
              </div>
            </div>

            <div className="mb-12 rounded-xl overflow-hidden">
              <FallbackImage
                src={post.cover_image || "/placeholder.svg?height=720&width=1280"}
                alt={post.title}
                fallbackSrc="/placeholder.svg?height=720&width=1280"
                className="w-full h-auto object-cover aspect-video"
              />
            </div>

            <GlassmorphicCard className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </GlassmorphicCard>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="container py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">You might also like</h2>

              <div className="grid gap-8 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                    <GlassmorphicCard className="h-full transition-all group-hover:shadow-xl">
                      <div className="aspect-video overflow-hidden rounded-t-xl">
                        <FallbackImage
                          src={relatedPost.cover_image || "/placeholder.svg?height=720&width=1280"}
                          alt={relatedPost.title}
                          fallbackSrc="/placeholder.svg?height=720&width=1280"
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-blue-500 mb-2">{relatedPost.category}</div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-500">{relatedPost.excerpt}</p>
                      </div>
                    </GlassmorphicCard>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
