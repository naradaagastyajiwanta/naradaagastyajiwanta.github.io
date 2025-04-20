"use client"

import type { Variants } from "framer-motion"

// Fade up animation - subtle and clean
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Scale animation
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Bounce animation
export const bounce: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
}

// Rotate in animation
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -5 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Parallax scroll effect
export const parallaxScroll = (yOffset: number) => ({
  y: yOffset,
  transition: { type: "spring", stiffness: 100, damping: 30 },
})

// Text reveal animation
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
}

// Card hover animation
export const cardHover = {
  y: -5,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  transition: { duration: 0.2 },
}

// Infinite pulse animation
export const infinitePulse: Variants = {
  hidden: { opacity: 0.6, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      duration: 1.5,
    },
  },
}
