import type React from "react"
// Increase the blur effect slightly to make the gradient circles more visible
export const BlueGradientCircle = ({
  position,
  size = "lg",
  opacity = 0.15,
}: { position: "left" | "right"; size?: "sm" | "md" | "lg"; opacity?: number }) => {
  const sizeClasses = {
    sm: "w-48 h-48 md:w-64 md:h-64",
    md: "w-64 h-64 md:w-96 md:h-96",
    lg: "w-96 h-96 md:w-[32rem] md:h-[32rem]",
  }

  const positionClasses = {
    left: "-left-16 md:-left-32",
    right: "-right-16 md:-right-32",
  }

  return (
    <div
      className={`absolute ${positionClasses[position]} ${position === "left" ? "top-24" : "bottom-24"} ${sizeClasses[size]} rounded-full bg-blue-500 filter blur-[80px] -z-10`}
      style={{ opacity }}
    />
  )
}

export const GlassmorphicCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`backdrop-blur-md bg-white/70 border border-white/20 shadow-lg rounded-xl ${className}`}>
      {children}
    </div>
  )
}
