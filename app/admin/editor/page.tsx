"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlueGradientCircle, GlassmorphicCard } from "@/components/ui-elements"
import AdminHeader from "@/components/admin-header"
import ProtectedRoute from "@/components/protected-route"
import { createPost } from "@/lib/actions/blog-actions"
import RichTextEditor from "@/components/rich-text-editor"

function PostEditor() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState("/placeholder.svg?height=720&width=1280")
  const [status, setStatus] = useState<"published" | "draft">("draft")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSave = async (newStatus: "published" | "draft") => {
    if (!title) {
      setError("Please enter a title for your post")
      return
    }

    if (!content) {
      setError("Please enter content for your post")
      return
    }

    if (!category) {
      setError("Please select a category for your post")
      return
    }

    setIsSaving(true)
    setError("")
    setMessage("Saving your post...")

    try {
      await createPost({
        title,
        content,
        excerpt: excerpt || undefined,
        cover_image: coverImage !== "/placeholder.svg?height=720&width=1280" ? coverImage : undefined,
        author: "Jiwan",
        category,
        status: newStatus,
      })

      setMessage("Post saved successfully!")

      // Redirect to admin dashboard after saving
      setTimeout(() => {
        router.push("/admin")
      }, 1000)
    } catch (error) {
      console.error("Error saving post:", error)
      setError(`Failed to save post: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-gray-50">
      {/* Decorative Elements */}
      <BlueGradientCircle position="left" size="lg" opacity={0.1} />
      <BlueGradientCircle position="right" size="lg" opacity={0.1} />

      <AdminHeader />

      {message && (
        <div className="container mt-4">
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-md">{message}</div>
        </div>
      )}

      {error && (
        <div className="container mt-4">
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </div>
        </div>
      )}

      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/admin">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">New Post</h1>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
              Save Draft
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => handleSave("published")}
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Publish"}
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <GlassmorphicCard className="p-6">
              <input
                type="text"
                placeholder="Post Title"
                className="w-full text-3xl font-bold border-none focus:outline-none bg-transparent mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <RichTextEditor content={content} onChange={setContent} minHeight="400px" />
            </GlassmorphicCard>
          </div>

          <div className="space-y-6">
            <GlassmorphicCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Post Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>

                  <select
                    className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="Tutorials">Tutorials</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Tools">Tools</option>
                    <option value="Advanced Techniques">Advanced Techniques</option>
                    <option value="Short-Form">Short-Form</option>
                    <option value="Audio">Audio</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Brief summary of your post"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                        className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                      />
                      <div className="text-xs text-gray-500">Use direct image URLs or YouTube thumbnail URLs</div>
                    </div>

                    {coverImage && (
                      <div className="mt-2">
                        <img
                          src={coverImage || "/placeholder.svg"}
                          alt="Cover preview"
                          className="h-32 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=720&width=1280"
                            setMessage("Error loading image. Please check the URL.")
                          }}
                        />
                      </div>
                    )}

                    <div className="text-sm text-gray-500">
                      <p>Tips:</p>
                      <ul className="list-disc pl-5 text-xs">
                        <li>For YouTube thumbnails, use: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg</li>
                        <li>Make sure the URL ends with an image extension (.jpg, .png, .webp, etc.)</li>
                        <li>Use copyright-free images or your own content</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard className="p-6">
              <h3 className="text-lg font-medium mb-4">SEO Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SEO Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="SEO Description"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Comma separated keywords"
                  />
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </main>
    </div>
  )
}

// Wrap the editor with the protected route
export default function PostEditorPage() {
  return (
    <ProtectedRoute>
      <PostEditor />
    </ProtectedRoute>
  )
}
