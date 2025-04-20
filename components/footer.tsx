"use client"

import { Instagram, Youtube, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <motion.footer
      className="border-t py-6 md:py-8 bg-white/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm text-gray-500">© 2025 Jiwan. {t.allRightsReserved}</div>
        </motion.div>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Instagram, href: "https://instagram.com/itisjiwan", label: "Instagram" },
            {
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="text-gray-500 hover:text-blue-500"
                  viewBox="0 0 448 512"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
              ),
              href: "https://tiktok.com/@itisjiwan",
              label: "TikTok",
            },
            { icon: Youtube, href: "https://www.youtube.com/@itisjiwan", label: "YouTube" },
            { icon: MessageSquare, href: "https://wa.me/6285121084588", label: "WhatsApp" },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {typeof item.icon === "function" ? <item.icon /> : <item.icon className="h-5 w-5" />}
              <span className="sr-only">{item.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  )
}
