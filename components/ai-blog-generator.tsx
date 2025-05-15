"use client"

import { useState } from "react"
import { generateBlogPostAction, createBlogPostFromAI } from "@/lib/actions/ai-actions"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import RichTextEditor from "@/components/rich-text-editor"
import { GlassmorphicCard } from "@/components/ui-elements"

export default function AIBlogGenerator() {
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [tone, setTone] = useState("professional")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState("")

  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [step, setStep] = useState<"input" | "edit" | "publish">("input")

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a topic")
      return
    }

    setError("")
    setSuccess("")
    setIsGenerating(true)

    try {
      const result = await generateBlogPostAction(topic, keywords, tone)

      if (!result.success) {
        throw new Error(result.error || "Failed to generate content")
      }

      setContent(result.data.content)
      // Generate a title from the topic
      setTitle(topic.charAt(0).toUpperCase() + topic.slice(1))
      // Generate an excerpt from the first paragraph
      const firstParagraph = result.data.content.split("</p>")[0].replace(/<[^>]*>/g, "")
      setExcerpt(firstParagraph.length > 150 ? firstParagraph.substring(0, 147) + "..." : firstParagraph)

      setStep("edit")
      setSuccess("Content generated successfully! You can now edit it before publishing.")
    } catch (error) {
      console.error("Error generating content:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePublish = async (status: "published" | "draft" = "draft") => {
    if (!title) {
      setError("Please enter a title")
      return
    }

    if (!content) {
      setError("Content cannot be empty")
      return
    }

    if (!category) {
      setError("Please select a category")
      return
    }

    setError("")
    setSuccess("")
    setIsPublishing(true)

    try {
      const result = await createBlogPostFromAI(title, content, excerpt, category, coverImage, status)

      if (!result.success) {
        throw new Error(result.error || "Failed to publish post")
      }

      setStep("publish")
      setSuccess(`Post ${status === "published" ? "published" : "saved as draft"} successfully!`)
    } catch (error) {
      console.error("Error publishing post:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsPublishing(false)
    }
  }

  const resetForm = () => {
    setTopic("")
    setKeywords("")
    setTone("professional")
    setTitle("")
    setContent("")
    setExcerpt("")
    setCategory("")
    setCoverImage("")
    setError("")
    setSuccess("")
    setStep("input")
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>{success}</div>
        </div>
      )}

      {step === "input" && (
        <GlassmorphicCard className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI Blog Content Generator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic *</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Video editing tips for beginners"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (optional)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., editing, software, timeline, effects"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="educational">Educational</option>
                <option value="conversational">Conversational</option>
                <option value="enthusiastic">Enthusiastic</option>
              </select>
            </div>

            <div className="pt-2">
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-blue-500 hover:bg-blue-600">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Content"
                )}
              </Button>
            </div>
          </div>
        </GlassmorphicCard>
      )}

      {step === "edit" && (
        <div className="space-y-6">
          <GlassmorphicCard className="p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Generated Content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
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
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Brief summary of your post (max 150 characters)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL (optional)</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handlePublish("draft")}
                  disabled={isPublishing}
                  variant="outline"
                  className="flex-1"
                >
                  {isPublishing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save as Draft"
                  )}
                </Button>

                <Button
                  onClick={() => handlePublish("published")}
                  disabled={isPublishing}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  {isPublishing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    "Publish"
                  )}
                </Button>
              </div>

              <div>
                <Button onClick={resetForm} variant="ghost" className="w-full text-gray-500">
                  Start Over
                </Button>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
      )}

      {step === "publish" && (
        <GlassmorphicCard className="p-6">
          <div className="text-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">Your blog post has been created successfully.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetForm} className="bg-blue-500 hover:bg-blue-600">
                Create Another Post
              </Button>
              <Button onClick={() => (window.location.href = "/admin")} variant="outline">
                Go to Dashboard
              </Button>
            </div>
          </div>
        </GlassmorphicCard>
      )}
    </div>
  )
}
