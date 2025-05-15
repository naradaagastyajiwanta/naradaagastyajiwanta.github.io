"use client"

import { useState } from "react"
import { generateVideoScriptAction } from "@/lib/actions/ai-actions"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, CheckCircle2, Copy } from "lucide-react"
import { GlassmorphicCard } from "@/components/ui-elements"

export default function VideoScriptGenerator() {
  const [title, setTitle] = useState("")
  const [brief, setBrief] = useState("")
  const [duration, setDuration] = useState("3-5 minutes")
  const [targetAudience, setTargetAudience] = useState("")

  const [generatedScript, setGeneratedScript] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [scriptId, setScriptId] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!title) {
      setError("Please enter a title")
      return
    }

    if (!brief) {
      setError("Please enter a brief description")
      return
    }

    if (!targetAudience) {
      setError("Please specify the target audience")
      return
    }

    setError("")
    setSuccess("")
    setIsGenerating(true)

    try {
      const result = await generateVideoScriptAction(title, brief, duration, targetAudience)

      if (!result.success) {
        throw new Error(result.error || "Failed to generate script")
      }

      setGeneratedScript(result.data.content)
      setScriptId(result.data.id)
      setSuccess("Script generated successfully!")
    } catch (error) {
      console.error("Error generating script:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript)
    setSuccess("Script copied to clipboard!")
  }

  const resetForm = () => {
    setTitle("")
    setBrief("")
    setDuration("3-5 minutes")
    setTargetAudience("")
    setGeneratedScript("")
    setScriptId(null)
    setError("")
    setSuccess("")
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

      <GlassmorphicCard className="p-6">
        <h2 className="text-xl font-semibold mb-4">Video Script Generator</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., How to Edit Videos Like a Pro"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description *</label>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Describe what the video should cover..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1-2 minutes">1-2 minutes (Short)</option>
              <option value="3-5 minutes">3-5 minutes (Medium)</option>
              <option value="5-10 minutes">5-10 minutes (Long)</option>
              <option value="10-15 minutes">10-15 minutes (Extended)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience *</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Beginner video editors, small business owners"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="pt-2">
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-blue-500 hover:bg-blue-600">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Script...
                </>
              ) : (
                "Generate Script"
              )}
            </Button>
          </div>
        </div>
      </GlassmorphicCard>

      {generatedScript && (
        <GlassmorphicCard className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Generated Script</h3>
            <Button onClick={copyToClipboard} variant="outline" size="sm" className="flex items-center">
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <div className="bg-white border border-gray-200 rounded-md p-4 whitespace-pre-wrap">{generatedScript}</div>
          <div className="mt-4 flex justify-between">
            <Button onClick={resetForm} variant="ghost">
              Create New Script
            </Button>
            {scriptId && (
              <Button
                onClick={() => (window.location.href = `/admin/scripts/${scriptId}`)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                View in Library
              </Button>
            )}
          </div>
        </GlassmorphicCard>
      )}
    </div>
  )
}
