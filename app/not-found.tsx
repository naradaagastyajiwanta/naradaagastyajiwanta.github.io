"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Film, Clapperboard, Scissors, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlueGradientCircle } from "@/components/ui-elements"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

export default function NotFound() {
  const { language } = useLanguage()
  const t = translations[language]

  // Animasi untuk elemen film yang melayang
  const floatingAnimation = {
    y: [0, -10, 0],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  // Animasi untuk timeline yang bergerak
  const timelineAnimation = {
    x: [-100, 100],
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  }

  // Animasi untuk gunting yang memotong
  const scissorsAnimation = {
    rotate: [0, 15, 0, -15, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1.5, delay: 0.2 }}>
        <BlueGradientCircle position="left" size="lg" opacity={0.2} />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1.5, delay: 0.4 }}>
        <BlueGradientCircle position="right" size="lg" opacity={0.2} />
      </motion.div>

      <Header />

      <main className="flex-1 container py-16 md:py-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto">
          {/* Animasi 404 dengan elemen video editing */}
          <div className="relative h-64 mb-8">
            {/* Angka 404 sebagai latar belakang */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-9xl font-bold text-gray-100 absolute inset-0 flex items-center justify-center z-0"
            >
              404
            </motion.div>

            {/* Elemen film yang melayang */}
            <motion.div
              className="absolute top-10 left-1/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, ...floatingAnimation }}
            >
              <Film className="h-16 w-16 text-blue-500" />
            </motion.div>

            {/* Elemen clapperboard yang melayang */}
            <motion.div
              className="absolute bottom-10 right-1/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, ...floatingAnimation }}
              transition={{ delay: 0.3 }}
            >
              <Clapperboard className="h-16 w-16 text-blue-500" />
            </motion.div>

            {/* Timeline yang bergerak */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-2 bg-blue-200 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-20 h-full bg-blue-500 rounded-full"
                animate={timelineAnimation}
              />
            </motion.div>

            {/* Gunting yang memotong */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, ...scissorsAnimation }}
            >
              <Scissors className="h-12 w-12 text-blue-500" />
            </motion.div>
          </div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Oops! Scene Not Found
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Looks like this scene was left on the cutting room floor.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2" size="lg" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-5 w-5" />
                Try Again
              </Button>
            </motion.div>
          </motion.div>

          {/* Animasi "film strip" di bagian bawah */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex gap-2">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-16 h-10 bg-gray-800 rounded-sm relative"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <div className="absolute top-0 h-2 w-2 bg-gray-900 rounded-full left-1"></div>
                  <div className="absolute top-0 h-2 w-2 bg-gray-900 rounded-full right-1"></div>
                  <div className="absolute bottom-0 h-2 w-2 bg-gray-900 rounded-full left-1"></div>
                  <div className="absolute bottom-0 h-2 w-2 bg-gray-900 rounded-full right-1"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
