"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

export default function Header() {
  const { language } = useLanguage()
  const t = translations[language]

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
        <nav className="hidden md:flex gap-6">
          {[
            { href: "/#work", label: t.work },
            { href: "/#shorts", label: t.shorts },
            { href: "/#about", label: t.about },
            { href: "/blog", label: t.blog },
            { href: "/#contact", label: t.contact },
          ].map((item, index) => (
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
        </nav>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="hidden md:flex bg-white text-blue-500 hover:bg-blue-50"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            {t.letsTalk}
          </Button>
        </motion.div>
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="outline" size="icon" className="border-white text-white hover:bg-blue-400/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}
