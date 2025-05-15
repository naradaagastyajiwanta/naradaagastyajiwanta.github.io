"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function CursorEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Reset cursor state when navigating between pages
  useEffect(() => {
    setCursorVariant("default")
  }, [pathname])

  useEffect(() => {
    // Only show cursor effect after a short delay to prevent flash on page load
    const timer = setTimeout(() => setIsVisible(true), 1000)

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseDown = () => setCursorVariant("click")
    const mouseUp = () => setCursorVariant("default")

    // Detect hovering over links and buttons
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setCursorVariant("hover")
      }
    }

    const handleMouseLeave = () => {
      setCursorVariant("default")
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)
    window.addEventListener("mouseover", handleMouseEnter)
    window.addEventListener("mouseout", handleMouseLeave)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)
      window.removeEventListener("mouseover", handleMouseEnter)
      window.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [])

  // Don't render on mobile devices
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768
    if (isMobile) {
      setIsVisible(false)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(59, 130, 246, 0.5)", // blue-500 with opacity
      mixBlendMode: "difference" as const,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(59, 130, 246, 0.3)",
      mixBlendMode: "difference" as const,
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 24,
      width: 24,
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      mixBlendMode: "difference" as const,
    },
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
    </AnimatePresence>
  )
}
