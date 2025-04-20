"use client"

import { useState } from "react"

interface FallbackImageProps {
  src: string
  alt: string
  fallbackSrc: string
  className?: string
}

export default function FallbackImage({ src, alt, fallbackSrc, className = "" }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img className={className} src={imgSrc || "/placeholder.svg"} alt={alt} onError={() => setImgSrc(fallbackSrc)} />
  )
}
