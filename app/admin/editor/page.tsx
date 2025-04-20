"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlueGradientCircle, GlassmorphicCard } from "@/components/ui-elements"
import AdminHeader from "@/components/admin-header"
import { blogService } from "@/lib/blog-service"
import ProtectedRoute from "@/components/protected-route"

function PostEditor() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState("/placeholder.svg?height=720&width=1280")
  const [status, setStatus] = useState("draft")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  const handleSave = (newStatus: string) => {
    if (!title) {
      alert("Please enter a title for your post")
      return
    }

    if (!content) {
      alert("Please enter content for your post")
      return
    }

    if (!category) {
      alert("Please select a category for your post")
      return
    }

    setIsSaving(true)

    try {
      blogService.createPost({
        title,
        content,
        excerpt: excerpt || title,
        coverImage,
        author: "Jiwan",
        category,
        status: newStatus as "published" | "draft",
        readTime: blogService.calculateReadTime(content),
      })

      // Redirect to admin dashboard after saving
      router.push("/admin")
    } catch (error) {
      console.error("Error saving post:", error)
      alert("There was an error saving your post. Please try again.")
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

      {message && <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-md">{message}</div>}

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

              <div className="border rounded-lg overflow-hidden mb-4">
                <div className="bg-gray-50 border-b px-4 py-2 flex items-center">
                  <button className="p-2 hover:bg-gray-100 rounded mr-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded mr-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 010 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded mr-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded mr-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a3 3 0 00-3-3 3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1h-2V7a3 3 0 00-3-3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <textarea
                  className="w-full p-4 min-h-[400px] focus:outline-none"
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
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
