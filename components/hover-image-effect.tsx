"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface HoverImageEffectProps {
  children: React.ReactNode
  className?: string
}

export default function HoverImageEffect({ children, className = "" }: HoverImageEffectProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? "brightness(1.1)" : "brightness(1)",
        }}
        transition={{ duration: 0.4 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* Overlay effect on hover */}
      <motion.div
        className="absolute inset-0 bg-blue-500/10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute top-0 left-0 h-0.5 bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3, delay: isHovered ? 0 : 0.3 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-0.5 bg-blue-500"
          initial={{ height: 0 }}
          animate={{ height: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0.2 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-0.5 bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0.1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-0.5 bg-blue-500"
          initial={{ height: 0 }}
          animate={{ height: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3, delay: isHovered ? 0.3 : 0 }}
        />
      </motion.div>
    </motion.div>
  )
}
