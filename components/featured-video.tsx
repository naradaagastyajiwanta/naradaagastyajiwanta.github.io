"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeaturedVideoProps {
  videoId: string
  title: string
}

export default function FeaturedVideo({ videoId, title }: FeaturedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  const playVideo = () => {
    setIsPlaying(true)
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
      {!isPlaying ? (
        <>
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
            <Button size="icon" className="h-16 w-16 rounded-full bg-blue-500 hover:bg-blue-600" onClick={playVideo}>
              <Play className="h-8 w-8 fill-white text-white" />
            </Button>
          </div>
          <img src={thumbnailUrl || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
        </>
      ) : (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  )
}
