"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { GlassmorphicCard } from "./ui-elements"
import HoverImageEffect from "./hover-image-effect"

interface ShortVideoCardProps {
  title: string
  category: string
  thumbnail: string
  duration: string
  videoId?: string
}

export default function ShortVideoCard({ title, category, thumbnail, duration, videoId }: ShortVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleClick = () => {
    if (videoId) {
      setIsPlaying(true)
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <GlassmorphicCard className="overflow-hidden hover:shadow-xl transition-all duration-300">
        <div
          className="relative aspect-[9/16] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          {isPlaying && videoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <HoverImageEffect>
              <motion.div
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button size="icon" className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                    >
                      <Play className="h-6 w-6 fill-white text-white" />
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.img
                src={thumbnail || "/placeholder.svg"}
                alt={title}
                className="h-full w-full object-cover"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs text-white rounded">
                {duration}
              </div>
            </HoverImageEffect>
          )}
        </div>
        <CardContent className="p-4 bg-white/80">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-blue-500 font-medium"
          >
            {category}
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-semibold mt-1"
          >
            {title}
          </motion.h3>
        </CardContent>
      </GlassmorphicCard>
    </motion.div>
  )
}
