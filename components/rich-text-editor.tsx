"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  Quote,
  Undo,
  Redo,
  LinkIcon,
} from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  minHeight?: string
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Tulis konten artikel Anda di sini...",
  minHeight = "400px",
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none w-full max-w-full",
        style: `min-height: ${minHeight}; padding: 1rem;`,
      },
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="border rounded-lg bg-white" style={{ minHeight }}>
        <div className="border-b px-4 py-2 flex flex-wrap gap-1 items-center bg-gray-50">Loading editor...</div>
        <div className="p-4">{content || placeholder}</div>
      </div>
    )
  }

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run()
  }

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run()
  }

  const toggleBulletList = () => {
    editor?.chain().focus().toggleBulletList().run()
  }

  const toggleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run()
  }

  const toggleHeading1 = () => {
    editor?.chain().focus().toggleHeading({ level: 1 }).run()
  }

  const toggleHeading2 = () => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run()
  }

  const toggleHeading3 = () => {
    editor?.chain().focus().toggleHeading({ level: 3 }).run()
  }

  const setParagraph = () => {
    editor?.chain().focus().setParagraph().run()
  }

  const toggleBlockquote = () => {
    editor?.chain().focus().toggleBlockquote().run()
  }

  const undo = () => {
    editor?.chain().focus().undo().run()
  }

  const redo = () => {
    editor?.chain().focus().redo().run()
  }

  const setLink = () => {
    const url = window.prompt("URL")
    if (url) {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    } else {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run()
    }
  }

  const isActive = (type: string, options?: any) => {
    if (!editor) return false

    switch (type) {
      case "bold":
        return editor.isActive("bold")
      case "italic":
        return editor.isActive("italic")
      case "bulletList":
        return editor.isActive("bulletList")
      case "orderedList":
        return editor.isActive("orderedList")
      case "heading":
        return editor.isActive("heading", options || {})
      case "paragraph":
        return editor.isActive("paragraph")
      case "blockquote":
        return editor.isActive("blockquote")
      default:
        return false
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="border-b px-4 py-2 flex flex-wrap gap-1 items-center bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleBold}
          className={`p-2 ${isActive("bold") ? "bg-gray-200" : ""}`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleItalic}
          className={`p-2 ${isActive("italic") ? "bg-gray-200" : ""}`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleHeading1}
          className={`p-2 ${isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleHeading2}
          className={`p-2 ${isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleHeading3}
          className={`p-2 ${isActive("heading", { level: 3 }) ? "bg-gray-200" : ""}`}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={setParagraph}
          className={`p-2 ${isActive("paragraph") ? "bg-gray-200" : ""}`}
          title="Paragraph"
        >
          <Pilcrow className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleBulletList}
          className={`p-2 ${isActive("bulletList") ? "bg-gray-200" : ""}`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleOrderedList}
          className={`p-2 ${isActive("orderedList") ? "bg-gray-200" : ""}`}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleBlockquote}
          className={`p-2 ${isActive("blockquote") ? "bg-gray-200" : ""}`}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={setLink} className="p-2" title="Link">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={undo}
          className="p-2"
          title="Undo"
          disabled={!editor?.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={redo}
          className="p-2"
          title="Redo"
          disabled={!editor?.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  )
}
