"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export default function Parallax({ children, speed = 0.5, className = "", direction = "up" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const isHorizontal = direction === "left" || direction === "right"

  // Calculate transform based on direction
  let transform
  if (direction === "up") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  } else if (direction === "down") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  } else if (direction === "left") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  } else if (direction === "right") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  } else {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]) // Default value
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{
          [isHorizontal ? "x" : "y"]: transform,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
