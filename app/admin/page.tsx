"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle, Edit, Trash2, Eye, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlueGradientCircle, GlassmorphicCard } from "@/components/ui-elements"
import AdminHeader from "@/components/admin-header"
import { blogService, type BlogPost } from "@/lib/blog-service"
import ProtectedRoute from "@/components/protected-route"

function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showNotification, setShowNotification] = useState(true)

  // Load posts on component mount
  useEffect(() => {
    setPosts(blogService.getAllPosts())
    setIsLoading(false)
  }, [])

  const filteredPosts = filter === "all" ? posts : posts.filter((post) => post.status === filter)

  const deletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const success = blogService.deletePost(id)
      if (success) {
        setPosts(blogService.getAllPosts())
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-gray-50">
      {/* Decorative Elements */}
      <BlueGradientCircle position="left" size="lg" opacity={0.1} />
      <BlueGradientCircle position="right" size="lg" opacity={0.1} />

      <AdminHeader />

      <main className="flex-1 container py-8">
        {showNotification && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-md flex items-start">
            <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">New Feature: Image URLs for Cover Images</p>
              <p className="text-sm mt-1">
                You can now use image URLs for blog post cover images instead of uploading files. This helps save
                storage space. When editing existing posts, you can replace uploaded images with URLs.
              </p>
            </div>
            <button className="text-blue-700 hover:text-blue-900 ml-2" onClick={() => setShowNotification(false)}>
              ×
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Link href="/admin/editor">
            <Button className="bg-blue-500 hover:bg-blue-600">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <div className="mb-6 flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-blue-500 hover:bg-blue-600" : ""}
          >
            All
          </Button>
          <Button
            variant={filter === "published" ? "default" : "outline"}
            onClick={() => setFilter("published")}
            className={filter === "published" ? "bg-blue-500 hover:bg-blue-600" : ""}
          >
            Published
          </Button>
          <Button
            variant={filter === "draft" ? "default" : "outline"}
            onClick={() => setFilter("draft")}
            className={filter === "draft" ? "bg-blue-500 hover:bg-blue-600" : ""}
          >
            Drafts
          </Button>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-500">No posts found</h3>
            <p className="mt-2 text-gray-400">
              {filter === "all" ? "Start by creating your first blog post" : `No ${filter} posts found`}
            </p>
          </div>
        ) : (
          <GlassmorphicCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <img
                              className="h-10 w-10 rounded object-cover"
                              src={post.coverImage || "/placeholder.svg"}
                              alt=""
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                              }}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            post.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.status === "published" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.slug}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/editor/${post.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePost(post.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassmorphicCard>
        )}
      </main>
    </div>
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
