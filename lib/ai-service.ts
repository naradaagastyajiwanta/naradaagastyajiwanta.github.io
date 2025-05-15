import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { sql } from "@/lib/db"

// Tipe data untuk berbagai fitur AI
export type ContentType = "blog_post" | "video_script" | "quote" | "chatbot" | "portfolio_search"

// Fungsi untuk menyimpan konten yang dihasilkan oleh AI
export async function saveGeneratedContent(type: ContentType, prompt: string, content: string, metadata: any = {}) {
  try {
    const result = await sql`
      INSERT INTO ai_generated_content (type, prompt, content, metadata)
      VALUES (${type}, ${prompt}, ${content}, ${JSON.stringify(metadata)})
      RETURNING id
    `
    return result[0]?.id
  } catch (error) {
    console.error("Error saving generated content:", error)
    throw new Error("Failed to save generated content")
  }
}

// Fungsi untuk mengambil konten yang dihasilkan oleh AI berdasarkan tipe
export async function getGeneratedContentByType(type: ContentType, limit = 10) {
  try {
    const result = await sql`
      SELECT * FROM ai_generated_content
      WHERE type = ${type}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return result
  } catch (error) {
    console.error("Error fetching generated content:", error)
    return []
  }
}

// Fungsi untuk menghasilkan konten blog dengan Groq
export async function generateBlogContent(topic: string, keywords = "", tone = "professional") {
  try {
    const prompt = `
      Write a comprehensive blog post about "${topic}".
      ${keywords ? `Include these keywords: ${keywords}.` : ""}
      Use a ${tone} tone.
      The blog post should include:
      - An engaging introduction
      - At least 3 main sections with subheadings
      - Practical tips and advice
      - A conclusion
      Format the content with HTML tags for headings, paragraphs, and lists.
    `

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    // Simpan konten yang dihasilkan ke database
    const contentId = await saveGeneratedContent("blog_post", prompt, text, { topic, keywords, tone })

    return { content: text, id: contentId }
  } catch (error) {
    console.error("Error generating blog content:", error)
    throw new Error("Failed to generate blog content")
  }
}

// Fungsi untuk menghasilkan script video dengan Groq
export async function generateVideoScript(title: string, brief: string, duration: string, targetAudience: string) {
  try {
    const prompt = `
      Create a detailed video script for a video titled "${title}".
      Brief: ${brief}
      Target duration: ${duration}
      Target audience: ${targetAudience}
      
      The script should include:
      - Introduction
      - Main content sections
      - Conclusion
      - Visual directions and scene descriptions
      
      Format the script with clear scene breakdowns, dialogue, and visual instructions.
    `

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.7,
      maxTokens: 2500,
    })

    // Simpan script yang dihasilkan ke database
    const result = await sql`
      INSERT INTO video_scripts (title, brief, script_content, duration)
      VALUES (${title}, ${brief}, ${text}, ${duration})
      RETURNING id
    `

    return { content: text, id: result[0]?.id }
  } catch (error) {
    console.error("Error generating video script:", error)
    throw new Error("Failed to generate video script")
  }
}

// Fungsi untuk menghasilkan quote proyek dengan Groq
export async function generateProjectQuote(
  clientName: string,
  projectType: string,
  projectDetails: string,
  additionalRequirements = "",
) {
  try {
    const prompt = `
      Generate a professional quote for a video editing project with the following details:
      Client: ${clientName}
      Project Type: ${projectType}
      Project Details: ${projectDetails}
      Additional Requirements: ${additionalRequirements}
      
      The quote should include:
      - A brief introduction
      - Project scope
      - Estimated timeline
      - Pricing breakdown
      - Terms and conditions
      
      Also provide an estimated total price and timeline based on the project details.
    `

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.7,
      maxTokens: 1500,
    })

    // Ekstrak perkiraan harga dan timeline dari respons AI
    // Ini adalah ekstraksi sederhana, dalam implementasi nyata mungkin perlu lebih canggih
    const priceMatch = text.match(/\$(\d+,?\d*)/)
    const estimatedPrice = priceMatch ? Number.parseFloat(priceMatch[1].replace(",", "")) : 0

    const timelineMatch = text.match(/(\d+-\d+)\s+(days|weeks|months)/i)
    const estimatedTimeline = timelineMatch ? timelineMatch[0] : "To be determined"

    // Simpan quote yang dihasilkan ke database
    const projectDetailsJson = {
      projectType,
      projectDetails,
      additionalRequirements,
    }

    const result = await sql`
      INSERT INTO project_quotes (
        client_name, project_details, estimated_price, 
        estimated_timeline, quote_content
      )
      VALUES (
        ${clientName}, ${JSON.stringify(projectDetailsJson)}, ${estimatedPrice}, 
        ${estimatedTimeline}, ${text}
      )
      RETURNING id
    `

    return {
      content: text,
      id: result[0]?.id,
      estimatedPrice,
      estimatedTimeline,
    }
  } catch (error) {
    console.error("Error generating project quote:", error)
    throw new Error("Failed to generate project quote")
  }
}

// Fungsi untuk chatbot dengan Groq
export async function getChatbotResponse(
  sessionId: string,
  message: string,
  chatHistory: { role: "user" | "assistant"; content: string }[] = [],
) {
  try {
    // Buat prompt dengan konteks tentang layanan video editing
    const systemPrompt = `
      You are a helpful assistant for a video editing service. Your name is JiwanAI.
      You can help with information about video editing services, pricing, process, and general advice.
      Be friendly, professional, and concise in your responses.
      If you don't know something, say so and offer to connect the user with a human representative.
      
      Services offered:
      - YouTube video editing
      - Short-form content (TikTok, Reels, Shorts)
      - Corporate videos and company profiles
      - Video Sales Letters (VSL)
      - Color grading and visual effects
      
      Pricing generally ranges from $50-$500 depending on video length, complexity, and turnaround time.
    `

    // Gabungkan history chat dengan pesan baru
    const fullPrompt = `
      ${systemPrompt}
      
      Chat History:
      ${chatHistory.map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`).join("\n")}
      
      User: ${message}
      
      Assistant:
    `

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: fullPrompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    // Update atau buat percakapan baru di database
    const newMessage = { role: "user", content: message, timestamp: new Date().toISOString() }
    const newResponse = { role: "assistant", content: text, timestamp: new Date().toISOString() }

    // Cek apakah sesi sudah ada
    const existingSession = await sql`
      SELECT * FROM chatbot_conversations
      WHERE session_id = ${sessionId}
      LIMIT 1
    `

    if (existingSession.length > 0) {
      // Update sesi yang ada
      const currentMessages = existingSession[0].messages || []
      const updatedMessages = [...currentMessages, newMessage, newResponse]

      await sql`
        UPDATE chatbot_conversations
        SET messages = ${JSON.stringify(updatedMessages)}, updated_at = NOW()
        WHERE session_id = ${sessionId}
      `
    } else {
      // Buat sesi baru
      await sql`
        INSERT INTO chatbot_conversations (session_id, messages, metadata)
        VALUES (${sessionId}, ${JSON.stringify([newMessage, newResponse])}, ${JSON.stringify({})})
      `
    }

    return { response: text }
  } catch (error) {
    console.error("Error getting chatbot response:", error)
    throw new Error("Failed to get chatbot response")
  }
}

// Fungsi untuk pencarian portfolio dengan AI
export async function searchPortfolio(query: string) {
  try {
    const prompt = `
      You are a video portfolio search assistant. Based on the following natural language query,
      extract key search parameters like video type, style, mood, industry, etc.
      
      Query: "${query}"
      
      Return a JSON object with these parameters:
      {
        "videoType": "", // e.g., "corporate", "short-form", "YouTube", "VSL", etc.
        "style": "", // e.g., "minimalist", "energetic", "professional", etc.
        "mood": "", // e.g., "serious", "fun", "inspirational", etc.
        "industry": "", // e.g., "tech", "education", "fitness", etc.
        "keywords": [] // array of other relevant keywords
      }
      
      Be very specific and accurate with the parameters. Extract as many relevant keywords as possible.
      Only return the JSON object, nothing else.
    `

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.3,
      maxTokens: 500,
    })

    // Parse JSON dari respons
    let searchParams
    try {
      // Cari JSON object dalam respons
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        searchParams = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (jsonError) {
      console.error("Error parsing search parameters:", jsonError)
      // Fallback sederhana jika parsing gagal
      searchParams = {
        videoType: "",
        style: "",
        mood: "",
        industry: "",
        keywords: query.split(" ").filter((word) => word.length > 3),
      }
    }

    // Simpan query pencarian ke database untuk analisis di masa depan
    await saveGeneratedContent("portfolio_search", query, JSON.stringify(searchParams))

    return searchParams
  } catch (error) {
    console.error("Error searching portfolio:", error)
    throw new Error("Failed to search portfolio")
  }
}
