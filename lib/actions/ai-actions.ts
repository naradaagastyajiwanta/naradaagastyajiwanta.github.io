"use server"

import {
  generateBlogContent,
  generateVideoScript,
  generateProjectQuote,
  getChatbotResponse,
  searchPortfolio,
} from "@/lib/ai-service"
import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"

// Action untuk pencarian portfolio
export async function searchPortfolioAction(query: string) {
  try {
    const searchParams = await searchPortfolio(query)

    // Dalam implementasi nyata, di sini Anda akan melakukan pencarian di database video
    // berdasarkan parameter yang diekstrak. Untuk contoh ini, kita akan mengembalikan
    // beberapa video dummy yang cocok dengan query.

    // Contoh video dummy dengan metadata yang lebih kaya
    const dummyVideos = [
      {
        id: 1,
        title: "Corporate Introduction - Dawnna Sales Strategist",
        category: "Corporate",
        thumbnail: "https://img.youtube.com/vi/Pes8IAkVLpQ/maxresdefault.jpg",
        videoId: "Pes8IAkVLpQ",
        metadata: {
          style: "professional",
          mood: "serious",
          industry: "business",
          tags: ["corporate", "professional", "business", "sales", "coach", "introduction"],
        },
      },
      {
        id: 2,
        title: "YouTube Video Showcase - Yoav",
        category: "Showcase",
        thumbnail: "https://img.youtube.com/vi/ifXYgtE3zj0/maxresdefault.jpg",
        videoId: "ifXYgtE3zj0",
        metadata: {
          style: "dynamic",
          mood: "energetic",
          industry: "content creation",
          tags: ["youtube", "showcase", "content", "creator", "dynamic"],
        },
      },
      {
        id: 3,
        title: "Video Sales Letter - Wonderfulwebsite",
        category: "VSL",
        thumbnail: "https://img.youtube.com/vi/gUFpvhAcuL8/maxresdefault.jpg",
        videoId: "gUFpvhAcuL8",
        metadata: {
          style: "persuasive",
          mood: "professional",
          industry: "marketing",
          tags: ["vsl", "sales", "marketing", "conversion", "website"],
        },
      },
      {
        id: 4,
        title: "Trial Edit - YouTube Video",
        category: "Trial Edit",
        thumbnail: "https://img.youtube.com/vi/X2QYNhI-h6U/maxresdefault.jpg",
        videoId: "X2QYNhI-h6U",
        metadata: {
          style: "clean",
          mood: "informative",
          industry: "education",
          tags: ["youtube", "tutorial", "educational", "informative"],
        },
      },
      {
        id: 5,
        title: "Company Profile - Case Value",
        category: "Company Profile",
        thumbnail: "https://img.youtube.com/vi/7HeahSXxBoI/maxresdefault.jpg",
        videoId: "7HeahSXxBoI",
        metadata: {
          style: "corporate",
          mood: "professional",
          industry: "business",
          tags: ["company", "profile", "corporate", "business", "professional"],
        },
      },
      {
        id: 6,
        title: "Faceless YouTube Video - QuantaInvest",
        category: "Showcase",
        thumbnail: "https://img.youtube.com/vi/eIqipwf-V-I/maxresdefault.jpg",
        videoId: "eIqipwf-V-I",
        metadata: {
          style: "minimalist",
          mood: "serious",
          industry: "finance",
          tags: ["faceless", "finance", "investment", "educational", "minimalist"],
        },
      },
      {
        id: 7,
        title: "Short-Form Visual Effects",
        category: "Short",
        thumbnail: "https://img.youtube.com/vi/4VLSUlM8UvI/maxresdefault.jpg",
        videoId: "4VLSUlM8UvI",
        metadata: {
          style: "creative",
          mood: "energetic",
          industry: "entertainment",
          tags: ["short", "visual effects", "creative", "tiktok", "instagram", "social media"],
        },
      },
      {
        id: 8,
        title: "Short Video Edit - Social Media",
        category: "Short",
        thumbnail: "https://img.youtube.com/vi/RaW2M4Y8k20/maxresdefault.jpg",
        videoId: "RaW2M4Y8k20",
        metadata: {
          style: "trendy",
          mood: "fun",
          industry: "social media",
          tags: ["short", "social media", "tiktok", "instagram", "reels", "fun"],
        },
      },
    ]

    // Fungsi untuk menghitung skor kecocokan antara video dan parameter pencarian
    const calculateMatchScore = (video, params) => {
      let score = 0

      // Periksa kecocokan tipe video
      if (
        params.videoType &&
        (video.category.toLowerCase().includes(params.videoType.toLowerCase()) ||
          video.metadata.tags.some((tag) => tag.toLowerCase().includes(params.videoType.toLowerCase())))
      ) {
        score += 3
      }

      // Periksa kecocokan style
      if (
        params.style &&
        (video.metadata.style.toLowerCase().includes(params.style.toLowerCase()) ||
          video.metadata.tags.some((tag) => tag.toLowerCase().includes(params.style.toLowerCase())))
      ) {
        score += 2
      }

      // Periksa kecocokan mood
      if (
        params.mood &&
        (video.metadata.mood.toLowerCase().includes(params.mood.toLowerCase()) ||
          video.metadata.tags.some((tag) => tag.toLowerCase().includes(params.mood.toLowerCase())))
      ) {
        score += 2
      }

      // Periksa kecocokan industry
      if (
        params.industry &&
        (video.metadata.industry.toLowerCase().includes(params.industry.toLowerCase()) ||
          video.metadata.tags.some((tag) => tag.toLowerCase().includes(params.industry.toLowerCase())))
      ) {
        score += 2
      }

      // Periksa kecocokan keywords
      if (params.keywords && params.keywords.length > 0) {
        const keywordMatches = params.keywords.filter(
          (keyword) =>
            video.title.toLowerCase().includes(keyword.toLowerCase()) ||
            video.metadata.tags.some((tag) => tag.toLowerCase().includes(keyword.toLowerCase())),
        )

        score += keywordMatches.length
      }

      // Bonus untuk kecocokan judul
      if (params.keywords && params.keywords.length > 0) {
        const titleMatches = params.keywords.filter((keyword) =>
          video.title.toLowerCase().includes(keyword.toLowerCase()),
        )

        score += titleMatches.length * 0.5
      }

      return score
    }

    // Hitung skor untuk setiap video
    const scoredVideos = dummyVideos.map((video) => ({
      ...video,
      score: calculateMatchScore(video, searchParams),
    }))

    // Urutkan video berdasarkan skor (tertinggi ke terendah)
    const sortedVideos = scoredVideos
      .sort((a, b) => b.score - a.score)
      .filter((video) => video.score > 0) // Hanya tampilkan video dengan skor > 0
      .map(({ score, metadata, ...video }) => video) // Hapus skor dan metadata dari hasil

    return {
      success: true,
      data: {
        searchParams,
        results: sortedVideos.length > 0 ? sortedVideos : dummyVideos.slice(0, 3),
      },
    }
  } catch (error) {
    console.error("Error in searchPortfolioAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Action untuk menghasilkan konten blog
export async function generateBlogPostAction(topic: string, keywords: string, tone: string) {
  try {
    const { content, id } = await generateBlogContent(topic, keywords, tone)
    return { success: true, data: { content, id } }
  } catch (error) {
    console.error("Error in generateBlogPostAction:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Action untuk membuat blog post dari konten AI
export async function createBlogPostFromAI(
  title: string,
  content: string,
  excerpt: string,
  category: string,
  coverImage: string,
  status: "published" | "draft",
) {
  try {
    // Gunakan parameter binding untuk menghindari masalah SQL injection dan escape karakter
    await sql`
      INSERT INTO blog_posts (
        title, slug, content, excerpt, cover_image, 
        author, category, status, read_time
      ) VALUES (
        ${title}, ${title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim()}, ${content}, ${excerpt}, ${coverImage || null}, 
        ${"Jiwan"}, ${category}, ${status}, ${"5 min read"}
      )
      RETURNING *
    `

    revalidatePath("/blog")
    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    console.error("Error creating blog post from AI:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Action untuk menghasilkan script video
export async function generateVideoScriptAction(
  title: string,
  brief: string,
  duration: string,
  targetAudience: string,
) {
  try {
    const { content, id } = await generateVideoScript(title, brief, duration, targetAudience)
    return { success: true, data: { content, id } }
  } catch (error) {
    console.error("Error in generateVideoScriptAction:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Action untuk menghasilkan quote proyek
export async function generateProjectQuoteAction(
  clientName: string,
  projectType: string,
  projectDetails: string,
  additionalRequirements: string,
) {
  try {
    const { content, id, estimatedPrice, estimatedTimeline } = await generateProjectQuote(
      clientName,
      projectType,
      projectDetails,
      additionalRequirements,
    )
    return { success: true, data: { content, id, estimatedPrice, estimatedTimeline } }
  } catch (error) {
    console.error("Error in generateProjectQuoteAction:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Action untuk mendapatkan respon chatbot
export async function getChatbotResponseAction(
  sessionId: string,
  message: string,
  chatHistory: { role: "user" | "assistant"; content: string }[],
) {
  try {
    const { response } = await getChatbotResponse(sessionId, message, chatHistory)
    return { success: true, data: { response } }
  } catch (error) {
    console.error("Error in getChatbotResponseAction:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Action untuk mendapatkan history chat
export async function getChatHistoryBySessionId(sessionId: string) {
  try {
    const result = await sql`
      SELECT messages FROM chatbot_conversations
      WHERE session_id = ${sessionId}
      LIMIT 1
    `

    if (result.length > 0) {
      return { success: true, data: { messages: result[0].messages } }
    } else {
      return { success: true, data: { messages: [] } }
    }
  } catch (error) {
    console.error("Error in getChatHistoryBySessionId:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Action untuk mendapatkan semua project quotes
export async function getAllProjectQuotes() {
  try {
    const quotes = await sql`
      SELECT * FROM project_quotes
      ORDER BY created_at DESC
    `
    return { success: true, data: quotes }
  } catch (error) {
    console.error("Error fetching all project quotes:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Action untuk mendapatkan semua video scripts
export async function getAllVideoScripts() {
  try {
    const scripts = await sql`
      SELECT * FROM video_scripts
      ORDER BY created_at DESC
    `
    return { success: true, data: scripts }
  } catch (error) {
    console.error("Error fetching all video scripts:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
