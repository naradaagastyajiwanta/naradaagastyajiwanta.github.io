"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { getChatbotResponseAction, getChatHistoryBySessionId } from "@/lib/actions/ai-actions"
import { Button } from "@/components/ui/button"
import { Loader2, Send, X, MessageSquare, MinusCircle } from "lucide-react"
import { GlassmorphicCard } from "@/components/ui-elements"
import { v4 as uuidv4 } from "uuid"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export default function AIChatbot() {
  const [sessionId, setSessionId] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize session ID and load chat history
  useEffect(() => {
    // Check if there's a session ID in localStorage
    const storedSessionId = localStorage.getItem("chatSessionId")
    const newSessionId = storedSessionId || uuidv4()

    if (!storedSessionId) {
      localStorage.setItem("chatSessionId", newSessionId)
    }

    setSessionId(newSessionId)

    // Load chat history
    const loadChatHistory = async () => {
      try {
        const result = await getChatHistoryBySessionId(newSessionId)

        if (result.success && result.data.messages) {
          setMessages(result.data.messages)
        } else {
          // Add welcome message if no history
          setMessages([
            {
              role: "assistant",
              content: "Hi there! I'm JiwanAI, your video editing assistant. How can I help you today?",
              timestamp: new Date().toISOString(),
            },
          ])
        }
      } catch (error) {
        console.error("Error loading chat history:", error)
        setError("Failed to load chat history")
      }
    }

    loadChatHistory()
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError("")

    try {
      // Convert messages to the format expected by the API
      const chatHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const result = await getChatbotResponseAction(sessionId, input, chatHistory)

      if (!result.success) {
        throw new Error(result.error || "Failed to get response")
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: result.data.response,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setError("Failed to get response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    if (confirm("Are you sure you want to clear the chat history?")) {
      setMessages([
        {
          role: "assistant",
          content: "Chat history cleared. How can I help you today?",
          timestamp: new Date().toISOString(),
        },
      ])

      // Generate a new session ID
      const newSessionId = uuidv4()
      localStorage.setItem("chatSessionId", newSessionId)
      setSessionId(newSessionId)
    }
  }

  // Render the chatbot as a floating button when closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96">
      <GlassmorphicCard className="flex flex-col h-[500px] shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">JiwanAI Assistant</h3>
          <div className="flex gap-2">
            <Button onClick={clearChat} variant="ghost" size="sm" className="h-8 w-8 p-0" title="Clear chat">
              <MinusCircle className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="max-w-[80%] rounded-lg p-2 bg-red-50 text-red-500 text-sm">{error}</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </GlassmorphicCard>
    </div>
  )
}
