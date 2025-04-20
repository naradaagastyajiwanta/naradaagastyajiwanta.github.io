"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deletePost } from "@/lib/actions/blog-actions"

interface DeletePostButtonProps {
  postId: number
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(true)
      try {
        await deletePost(postId)
      } catch (error) {
        console.error("Error deleting post:", error)
        alert("Failed to delete post. Please try again.")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
