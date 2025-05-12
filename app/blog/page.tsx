import { Suspense } from "react"
import Link from "next/link"
import { PenSquare } from "lucide-react"
import { getPublishedPosts } from "@/lib/actions/blog-actions"
import { Button, Container, Section, SectionTitle } from "@/components/ui-elements"
import BlogPostCard from "@/components/blog-post-card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BlueGradientCircle } from "@/components/ui-elements"
import BlogFallback from "@/components/blog-fallback"

// Tambahkan opsi revalidate untuk memastikan data selalu fresh
export const revalidate = 0

export default async function BlogPage() {
  try {
    // Ambil post dari database
    const posts = await getPublishedPosts()

    return (
      <div className="flex min-h-screen flex-col relative overflow-hidden">
        {/* Decorative Elements */}
        <BlueGradientCircle position="left" size="lg" opacity={0.2} />
        <BlueGradientCircle position="right" size="lg" opacity={0.2} />

        <Header />

        <main className="flex-1">
          <Section>
            <Container>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                <div>
                  <SectionTitle>Blog & Articles</SectionTitle>
                  <p className="text-gray-500 max-w-2xl">
                    Insights, tips, and tutorials about video editing, storytelling, and content creation.
                  </p>
                </div>
                <Link href="/admin/editor" className="mt-4 md:mt-0">
                  <Button variant="primary" className="flex items-center">
                    <PenSquare className="mr-2 h-4 w-4" />
                    Write Article
                  </Button>
                </Link>
              </div>

              {posts.length === 0 ? (
                <BlogFallback message="No blog posts found. Check back later for new content!" />
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <Suspense fallback={<div>Loading posts...</div>}>
                    {posts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </Suspense>
                </div>
              )}
            </Container>
          </Section>
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error loading blog posts:", error)
    return <BlogFallback message="Failed to load blog posts. Please try again later." />
  }
}
