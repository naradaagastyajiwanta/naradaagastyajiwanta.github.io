"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Film,
  Clapperboard,
  Scissors,
  Video,
  Music,
  ImageIcon,
  Play,
  Pause,
  FastForward,
  Rewind,
  Camera,
} from "lucide-react"

export default function EditingIcons() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // Daftar ikon yang akan ditampilkan
  const icons = [
    { Icon: Film, size: 24, color: "text-blue-400" },
    { Icon: Clapperboard, size: 28, color: "text-blue-500" },
    { Icon: Scissors, size: 22, color: "text-blue-300" },
    { Icon: Video, size: 26, color: "text-blue-400" },
    { Icon: Music, size: 20, color: "text-blue-300" },
    { Icon: ImageIcon, size: 24, color: "text-blue-500" },
    { Icon: Play, size: 18, color: "text-blue-400" },
    { Icon: Pause, size: 18, color: "text-blue-300" },
    { Icon: FastForward, size: 20, color: "text-blue-400" },
    { Icon: Rewind, size: 20, color: "text-blue-300" },
    { Icon: Camera, size: 26, color: "text-blue-500" },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {icons.map((IconObj, index) => {
        // Posisi acak untuk setiap ikon
        const top = `${Math.random() * 90 + 5}%`
        const left = `${Math.random() * 90 + 5}%`

        // Animasi acak untuk setiap ikon
        const yMovement = Math.random() * 20 - 10
        const xMovement = Math.random() * 20 - 10
        const rotateAmount = Math.random() * 20 - 10
        const duration = Math.random() * 10 + 15
        const delay = Math.random() * 5

        return (
          <motion.div
            key={index}
            className={`absolute opacity-10 ${IconObj.color}`}
            style={{
              top,
              left,
              width: IconObj.size,
              height: IconObj.size,
            }}
            animate={{
              y: [0, yMovement, 0],
              x: [0, xMovement, 0],
              rotate: [0, rotateAmount, 0],
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay,
            }}
          >
            <IconObj.Icon size={IconObj.size} />
          </motion.div>
        )
      })}

      {/* Film strip elements */}
      {[...Array(3)].map((_, i) => {
        const top = `${Math.random() * 80 + 10}%`
        const left = `${Math.random() * 80 + 10}%`
        const rotate = Math.random() * 30 - 15
        const duration = Math.random() * 10 + 20

        return (
          <motion.div
            key={`filmstrip-${i}`}
            className="absolute opacity-10"
            style={{
              top,
              left,
              rotate: `${rotate}deg`,
              width: "120px",
              height: "30px",
            }}
            animate={{
              y: [0, Math.random() * 30 - 15, 0],
              rotate: [rotate, rotate + (Math.random() * 10 - 5), rotate],
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            <div className="bg-blue-400 h-full w-full rounded-md flex items-center justify-around">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-3 h-5 bg-white/30 rounded-sm"></div>
              ))}
            </div>
          </motion.div>
        )
      })}

      {/* Timeline elements */}
      {[...Array(2)].map((_, i) => {
        const top = `${Math.random() * 80 + 10}%`
        const left = `${Math.random() * 70 + 15}%`
        const width = `${Math.random() * 15 + 10}%`

        return (
          <motion.div
            key={`timeline-${i}`}
            className="absolute opacity-10"
            style={{
              top,
              left,
              width,
              height: "20px",
            }}
            animate={{
              y: [0, Math.random() * 20 - 10, 0],
              x: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            <div className="bg-blue-500 h-2 w-full rounded-full">
              <div className="bg-blue-300 h-full w-1/3 rounded-full"></div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
