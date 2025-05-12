import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AnimatedLayout from "@/components/animated-layout"
import { LanguageProvider } from "@/contexts/language-context"
import Script from "next/script"

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
        <LanguageProvider>
          <AnimatedLayout>{children}</AnimatedLayout>
        </LanguageProvider>
        {/* Add safe ethereum initialization script */}
        <Script id="ethereum-check" strategy="afterInteractive">
          {`
            // Safely handle ethereum initialization
            if (typeof window !== 'undefined') {
              // Don't try to define ethereum if it's already defined by a wallet extension
              if (!Object.getOwnPropertyDescriptor(window, 'ethereum')) {
                // Only define a dummy ethereum object if needed
                // window.ethereum = { isConnected: () => false };
                console.log('No ethereum provider detected');
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}
