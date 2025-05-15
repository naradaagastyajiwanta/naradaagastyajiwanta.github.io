"use client"

import { useState } from "react"
import { generateProjectQuoteAction } from "@/lib/actions/ai-actions"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, CheckCircle2, Download, Send } from "lucide-react"
import { GlassmorphicCard } from "@/components/ui-elements"

export default function QuoteGenerator() {
  const [clientName, setClientName] = useState("")
  const [projectType, setProjectType] = useState("")
  const [projectDetails, setProjectDetails] = useState("")
  const [additionalRequirements, setAdditionalRequirements] = useState("")

  const [generatedQuote, setGeneratedQuote] = useState("")
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)
  const [estimatedTimeline, setEstimatedTimeline] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [quoteId, setQuoteId] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!clientName) {
      setError("Please enter a client name")
      return
    }

    if (!projectType) {
      setError("Please select a project type")
      return
    }

    if (!projectDetails) {
      setError("Please enter project details")
      return
    }

    setError("")
    setSuccess("")
    setIsGenerating(true)

    try {
      const result = await generateProjectQuoteAction(clientName, projectType, projectDetails, additionalRequirements)

      if (!result.success) {
        throw new Error(result.error || "Failed to generate quote")
      }

      setGeneratedQuote(result.data.content)
      setEstimatedPrice(result.data.estimatedPrice)
      setEstimatedTimeline(result.data.estimatedTimeline)
      setQuoteId(result.data.id)
      setSuccess("Quote generated successfully!")
    } catch (error) {
      console.error("Error generating quote:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQuote = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedQuote], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `Quote_${clientName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const sendQuoteByEmail = () => {
    const subject = `Video Editing Quote for ${clientName}`
    const body = encodeURIComponent(generatedQuote)
    window.location.href = `mailto:${clientName}?subject=${subject}&body=${body}`
  }

  const resetForm = () => {
    setClientName("")
    setProjectType("")
    setProjectDetails("")
    setAdditionalRequirements("")
    setGeneratedQuote("")
    setEstimatedPrice(null)
    setEstimatedTimeline("")
    setQuoteId(null)
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
        <h2 className="text-xl font-semibold mb-4">Project Quote Generator</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g., John Smith or Company Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Type *</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a project type</option>
              <option value="YouTube Video">YouTube Video</option>
              <option value="Short-Form Content">Short-Form Content (TikTok, Reels, Shorts)</option>
              <option value="Corporate Video">Corporate Video</option>
              <option value="Company Profile">Company Profile</option>
              <option value="Video Sales Letter">Video Sales Letter (VSL)</option>
              <option value="Wedding Video">Wedding Video</option>
              <option value="Music Video">Music Video</option>
              <option value="Documentary">Documentary</option>
              <option value="Commercial">Commercial</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Details *</label>
            <textarea
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Describe the project, including length, style, complexity, etc."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements (optional)</label>
            <textarea
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              placeholder="Any special requests, deadlines, or specific requirements"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2">
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-blue-500 hover:bg-blue-600">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Quote...
                </>
              ) : (
                "Generate Quote"
              )}
            </Button>
          </div>
        </div>
      </GlassmorphicCard>

      {generatedQuote && (
        <GlassmorphicCard className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Generated Quote</h3>
            <div className="flex gap-2">
              <Button onClick={downloadQuote} variant="outline" size="sm" className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button onClick={sendQuoteByEmail} variant="outline" size="sm" className="flex items-center">
                <Send className="h-4 w-4 mr-1" />
                Email
              </Button>
            </div>
          </div>

          {(estimatedPrice !== null || estimatedTimeline) && (
            <div className="mb-4 grid grid-cols-2 gap-4">
              {estimatedPrice !== null && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="text-sm text-blue-700 font-medium">Estimated Price</div>
                  <div className="text-2xl font-bold">${estimatedPrice.toLocaleString()}</div>
                </div>
              )}
              {estimatedTimeline && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="text-sm text-blue-700 font-medium">Estimated Timeline</div>
                  <div className="text-2xl font-bold">{estimatedTimeline}</div>
                </div>
              )}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-md p-4 whitespace-pre-wrap">{generatedQuote}</div>
          <div className="mt-4 flex justify-between">
            <Button onClick={resetForm} variant="ghost">
              Create New Quote
            </Button>
            {quoteId && (
              <Button
                onClick={() => (window.location.href = `/admin/quotes/${quoteId}`)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Save to Library
              </Button>
            )}
          </div>
        </GlassmorphicCard>
      )}
    </div>
  )
}
