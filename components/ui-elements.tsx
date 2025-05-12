"use client"

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

// Add Button component
export const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  ...props
}: {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
    link: "bg-transparent text-blue-600 hover:underline p-0",
  }

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  }

  const baseClasses =
    "font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// Add Container component
export const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={`container mx-auto px-4 ${className}`}>{children}</div>
}

// Add Section component
export const Section = ({
  children,
  className = "",
  id,
}: { children: React.ReactNode; className?: string; id?: string }) => {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      {children}
    </section>
  )
}

// Add SectionTitle component
export const SectionTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${className}`}>{children}</h2>
}
