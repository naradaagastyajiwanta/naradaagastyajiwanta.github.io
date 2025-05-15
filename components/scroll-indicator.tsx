"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollIndicator() {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return <motion.div className="fixed top-16 left-0 right-0 h-0.5 bg-blue-500 origin-left z-50" style={{ scaleX }} />
}
