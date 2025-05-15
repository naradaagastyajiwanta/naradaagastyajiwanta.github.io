"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function BackgroundEffects() {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()

  // Subtle parallax effect for background elements
  const leftCircleY = useTransform(scrollY, [0, 1000], [0, -100])
  const rightCircleY = useTransform(scrollY, [0, 1000], [0, -150])
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0.7])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Gradient circles with parallax */}
      <motion.div
        className="absolute -left-32 top-24 w-96 h-96 rounded-full bg-blue-500/20 blur-[80px]"
        style={{
          y: leftCircleY,
          opacity: opacityTransform,
        }}
      />
      <motion.div
        className="absolute -right-32 bottom-24 w-96 h-96 rounded-full bg-blue-500/20 blur-[80px]"
        style={{
          y: rightCircleY,
          opacity: opacityTransform,
        }}
      />
    </div>
  )
}
