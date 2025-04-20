"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"
import { Menu, X } from "lucide-react"

export default function Header() {
  const { language } = useLanguage()
  const t = translations[language]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const menuItems = [
    { href: "/#work", label: t.work },
    { href: "/#shorts", label: t.shorts },
    { href: "/#about", label: t.about },
    { href: "/blog", label: t.blog },
    { href: "/#contact", label: t.contact },
  ]

  return (
    <motion.header
      className="fixed top-0 z-50 w-full border-b border-blue-400/50 bg-blue-500/90 backdrop-blur-md shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div className="font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="text-xl text-white">
            Jiwan
            <motion.span
              className="text-white"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 5,
              }}
            >
              .
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link href={item.href} className="text-sm font-medium text-white hover:text-blue-100 transition-colors">
                {item.label}
              </Link>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <LanguageSwitcher />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="bg-white text-blue-500 hover:bg-blue-50"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t.letsTalk}
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />

          <motion.button
            className="text-white p-1 rounded-md"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-blue-500 border-t border-blue-400/50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white font-medium py-2 hover:text-blue-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                className="bg-white text-blue-500 hover:bg-blue-50 w-full mt-2"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  setMobileMenuOpen(false)
                }}
              >
                {t.letsTalk}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
