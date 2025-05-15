"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import EditingIcons from "./editing-icons"

interface AnimatedLayoutProps {
  children: ReactNode
}

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  // Only animate after first mount to prevent initial animation
  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  return (
    <>
      <EditingIcons />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={isFirstMount ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
