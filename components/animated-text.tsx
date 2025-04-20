"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedTextProps {
  text: string | ReactNode
  className?: string
  once?: boolean
  delay?: number
  type?: "words" | "chars" | "simple"
}

export default function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
  type = "simple",
}: AnimatedTextProps) {
  // For simple text animation
  if (type === "simple" || typeof text !== "string") {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        {text}
      </motion.div>
    )
  }

  // For word-by-word animation
  if (type === "words") {
    const words = text.split(" ")
    return (
      <motion.p className={className}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            style={{ display: "inline-block", marginRight: "0.25em" }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay + i * 0.1 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    )
  }

  // For character-by-character animation
  const chars = text.split("")
  return (
    <motion.p className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + i * 0.03 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.p>
  )
}
