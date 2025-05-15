"use client"

import type React from "react"

import { useState } from "react"
import { searchPortfolioAction } from "@/lib/actions/ai-actions"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, Search, Info } from "lucide-react"
import { GlassmorphicCard } from "@/components/ui-elements"
import VideoCard from "@/components/video-card"

type SearchParams = {
  videoType: string
  style: string
  mood: string
  industry: string
  keywords: string[]
}

type VideoResult = {
  id: number
  title: string
  category: string
  thumbnail: string
  videoId?: string
}

export default function PortfolioSearch() {
  const [query, setQuery] = useState("")
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)
  const [results, setResults] = useState<VideoResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search query")
      return
    }

    setError("")
    setIsSearching(true)

    try {
      const result = await searchPortfolioAction(query)

      if (!result.success) {
        throw new Error(result.error || "Failed to search portfolio")
      }

      setSearchParams(result.data.searchParams)
      setResults(result.data.results)

      // Simpan query ke history
      setSearchHistory((prev) => [query, ...prev.slice(0, 4)])
    } catch (error) {
      console.error("Error searching portfolio:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    // Tidak langsung mencari untuk memberi pengguna kesempatan mengedit
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}

      <GlassmorphicCard className="p-6">
        <h2 className="text-xl font-semibold mb-4">Smart Portfolio Search</h2>

        <div className="mb-4 bg-blue-50 p-4 rounded-md flex items-start">
          <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
          <div className="text-sm text-blue-700">
            <p className="font-medium">Pencarian Cerdas</p>
            <p className="mt-1">
              Gunakan bahasa alami untuk mencari video. Misalnya: "video corporate yang profesional", "konten pendek
              untuk sosial media yang energik", atau "video VSL untuk pemasaran".
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cari video dengan mendeskripsikan yang Anda inginkan..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSearch} disabled={isSearching} className="bg-blue-500 hover:bg-blue-600">
            {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
          </Button>
        </div>

        {/* Saran pencarian */}
        <div className="mt-3">
          <div className="text-sm text-gray-500 mb-2">Saran pencarian:</div>
          <div className="flex flex-wrap gap-2">
            {[
              "corporate video with professional style",
              "energetic short-form content",
              "minimalist youtube video",
              "sales video for marketing",
              "company profile video",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Riwayat pencarian */}
        {searchHistory.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500 mb-2">Pencarian terakhir:</div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(item)}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-full transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </GlassmorphicCard>

      {searchParams && (
        <GlassmorphicCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Search Results</h3>

          <div className="mb-4 bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-700 mb-2">We found videos matching:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {searchParams.videoType && (
                <div>
                  <span className="font-medium">Type:</span> {searchParams.videoType}
                </div>
              )}
              {searchParams.style && (
                <div>
                  <span className="font-medium">Style:</span> {searchParams.style}
                </div>
              )}
              {searchParams.mood && (
                <div>
                  <span className="font-medium">Mood:</span> {searchParams.mood}
                </div>
              )}
              {searchParams.industry && (
                <div>
                  <span className="font-medium">Industry:</span> {searchParams.industry}
                </div>
              )}
              {searchParams.keywords.length > 0 && (
                <div className="col-span-2">
                  <span className="font-medium">Keywords:</span> {searchParams.keywords.join(", ")}
                </div>
              )}
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((video) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  category={video.category}
                  thumbnail={video.thumbnail}
                  duration="View"
                  videoId={video.videoId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No videos found matching your search criteria.</div>
          )}
        </GlassmorphicCard>
      )}
    </div>
  )
}
