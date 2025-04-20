"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface ScrollAnimationProps {
  children: ReactNode
  variants?: Variants
  className?: string
  delay?: number
  threshold?: number
  once?: boolean
}

export default function ScrollAnimation({
  children,
  variants,
  className = "",
  delay = 0,
  threshold = 0.1,
  once = true,
}: ScrollAnimationProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold, triggerOnce: once })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible")
      if (once) setHasAnimated(true)
    } else if (!inView && !once && hasAnimated) {
      controls.start("hidden")
      setHasAnimated(false)
    }
  }, [controls, inView, hasAnimated, once])

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
