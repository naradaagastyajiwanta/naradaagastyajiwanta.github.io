"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { GlassmorphicCard } from "./ui-elements"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={className}
    >
      <GlassmorphicCard className={`h-full transition-all duration-300 ${className}`}>{children}</GlassmorphicCard>
    </motion.div>
  )
}
