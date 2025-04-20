"use client"

import Link from "next/link"
import { Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { GlassmorphicCard } from "./ui-elements"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  author: string
  category: string
  slug: string
}

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <GlassmorphicCard className="h-full overflow-hidden transition-all group-hover:shadow-xl">
          <div className="aspect-video overflow-hidden">
            <motion.img
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <motion.span
                className="text-sm font-medium text-blue-500"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {post.category}
              </motion.span>
              <motion.div
                className="flex items-center text-sm text-gray-500"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Calendar className="h-3 w-3 mr-1" />
                {post.date}
              </motion.div>
            </div>
            <motion.h3
              className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {post.title}
            </motion.h3>
            <motion.p
              className="text-gray-500 line-clamp-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {post.excerpt}
            </motion.p>
            <motion.div
              className="mt-4 text-blue-500 font-medium text-sm group-hover:underline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Read more
            </motion.div>
          </div>
        </GlassmorphicCard>
      </Link>
    </motion.div>
  )
}
