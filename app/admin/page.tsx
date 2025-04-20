import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle, Edit, Trash2, Eye, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlueGradientCircle, GlassmorphicCard } from "@/components/ui-elements"
import AdminHeader from "@/components/admin-header"
import ProtectedRoute from "@/components/protected-route"
import FallbackImage from "@/components/fallback-image"
import { getAllPosts, deletePost } from "@/lib/actions/blog-actions"

function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-gray-50">
      {/* Decorative Elements */}
      <BlueGradientCircle position="left" size="lg" opacity={0.1} />
      <BlueGradientCircle position="right" size="lg" opacity={0.1} />

      <AdminHeader />

      <main className="flex-1 container py-8">
        <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-md flex items-start">
          <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Cloud Storage for Blog Posts</p>
            <p className="text-sm mt-1">
              Blog posts are now stored in the cloud database. Cover images should be URLs to images hosted online. All
              users will now see the same content regardless of device.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Link href="/admin/editor">
            <Button className="bg-blue-500 hover:bg-blue-600">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <Suspense fallback={<div className="text-center py-12">Loading posts...</div>}>
          <BlogPostsList />
        </Suspense>
      </main>
    </div>
  )
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

async function BlogPostsList() {
  const posts = await getAllPosts()

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-500">No posts found</h3>
        <p className="mt-2 text-gray-400">Start by creating your first blog post</p>
      </div>
    )
  }

  return (
    <GlassmorphicCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => {
              const displayDate = post.created_at ? formatDate(new Date(post.created_at)) : ""

              return (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3">
                        <FallbackImage
                          className="h-10 w-10 rounded object-cover"
                          src={post.cover_image || "/placeholder.svg?height=40&width=40"}
                          alt=""
                          fallbackSrc="/placeholder.svg?height=40&width=40"
                        />
                      </div>
                      <div className="font-medium text-gray-900 truncate max-w-xs">{post.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{displayDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <form>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blog/${post.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </form>
                      <form>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/editor/${post.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </form>
                      <form
                        action={async () => {
                          if (confirm("Are you sure you want to delete this post?")) {
                            await deletePost(post.id)
                          }
                        }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          type="submit"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </GlassmorphicCard>
  )
}

// Wrap the dashboard with the protected route
export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
