"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleLanguage = (lang: "en" | "id") => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        className="flex items-center gap-1 text-white hover:text-blue-100 transition-colors px-2 py-1 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase text-sm">{language}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1">
              <button
                onClick={() => toggleLanguage("en")}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  language === "en" ? "bg-blue-50 text-blue-500" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                English
              </button>
              <button
                onClick={() => toggleLanguage("id")}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  language === "id" ? "bg-blue-50 text-blue-500" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Bahasa Indonesia
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
