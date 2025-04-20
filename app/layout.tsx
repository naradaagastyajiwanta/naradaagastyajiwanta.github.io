import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AnimatedLayout from "@/components/animated-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Video Editor Portfolio",
  description: "Professional video editor showcasing creative work and services",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} pt-16`}>
        <AnimatedLayout>{children}</AnimatedLayout>
      </body>
    </html>
  )
}
