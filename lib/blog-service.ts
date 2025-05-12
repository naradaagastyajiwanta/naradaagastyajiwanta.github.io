// Types for our blog posts
export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  coverImage: string
  date: string
  author: string
  category: string
  status: "published" | "draft"
  slug: string
  readTime?: string
}

// Initial sample blog posts
const initialPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Essential Video Editing Tips for Beginners",
    excerpt: "Learn the fundamental techniques that will elevate your video editing skills from day one.",
    content: `
      <p>Video editing is both an art and a science. For beginners, it can seem overwhelming at first, but with the right approach, you can quickly improve your skills and create professional-looking videos.</p>
      
      <h2>1. Learn Keyboard Shortcuts</h2>
      <p>One of the fastest ways to improve your editing efficiency is to learn keyboard shortcuts for your editing software. This will save you countless hours in the long run.</p>
      
      <h2>2. Cut to the Beat</h2>
      <p>When editing to music, try to time your cuts with the beat of the song. This creates a natural rhythm that viewers will subconsciously appreciate.</p>
      
      <h2>3. Use the Rule of Thirds</h2>
      <p>Position important elements along the lines or at the intersections of a 3×3 grid. Most editing software has an option to display this grid.</p>
      
      <h2>4. Don't Overuse Transitions</h2>
      <p>Simple cuts often work best. Fancy transitions should be used sparingly and only when they serve the story.</p>
      
      <h2>5. Color Correction is Essential</h2>
      <p>Even basic color correction can dramatically improve the look of your footage. Learn how to adjust exposure, contrast, and white balance.</p>
      
      <h2>6. Pay Attention to Audio</h2>
      <p>Poor audio can ruin otherwise great footage. Invest in decent microphones and learn basic audio editing techniques.</p>
      
      <h2>7. Tell a Story</h2>
      <p>Every edit should serve the story you're trying to tell. Ask yourself if each cut contributes to the narrative.</p>
      
      <h2>8. Watch Great Editors</h2>
      <p>Study films and videos with excellent editing. Try to understand why certain cuts work well.</p>
      
      <h2>9. Get Feedback</h2>
      <p>Share your work and be open to constructive criticism. Fresh eyes can spot issues you might miss.</p>
      
      <h2>10. Practice Regularly</h2>
      <p>Like any skill, editing improves with practice. Edit something every day, even if it's just a short clip.</p>
      
      <p>Remember, everyone starts somewhere. Don't be discouraged if your early work isn't perfect. Keep learning, experimenting, and refining your craft.</p>
    `,
    coverImage: "/placeholder.svg?height=720&width=1280",
    date: "April 10, 2025",
    author: "Jiwan",
    category: "Tutorials",
    status: "published",
    slug: "essential-video-editing-tips",
    readTime: "8 min read",
  },
  {
    id: "2",
    title: "How to Create Engaging YouTube Thumbnails",
    excerpt: "Discover the secrets to creating thumbnails that drive clicks and views on your YouTube videos.",
    content: `
      <p>Your thumbnail is the first thing viewers see when browsing YouTube. A compelling thumbnail can significantly increase your click-through rate and help your video perform better.</p>
      
      <h2>Why Thumbnails Matter</h2>
      <p>Thumbnails act as mini-billboards for your content. They need to be eye-catching, relevant, and give viewers a reason to click.</p>
      
      <h2>Key Elements of Effective Thumbnails</h2>
      <p>The best thumbnails typically include:</p>
      <ul>
        <li>Clear, high-quality images</li>
        <li>Minimal, large text (3-5 words maximum)</li>
        <li>Contrasting colors that pop</li>
        <li>Human faces showing emotion</li>
        <li>Visual consistency with your brand</li>
      </ul>
      
      <h2>Tools for Creating Thumbnails</h2>
      <p>You don't need expensive software to create great thumbnails. Tools like Canva, Adobe Express, or even PowerPoint can work well.</p>
      
      <h2>Testing Your Thumbnails</h2>
      <p>Don't be afraid to update thumbnails if they're not performing well. YouTube Analytics can show you which thumbnails have the best click-through rates.</p>
    `,
    coverImage: "/placeholder.svg?height=720&width=1280",
    date: "April 5, 2025",
    author: "Jiwan",
    category: "YouTube",
    status: "published",
    slug: "engaging-youtube-thumbnails",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "Color Grading: Taking Your Videos to the Next Level",
    excerpt: "Master the art of color grading to give your videos a professional and cinematic look.",
    content: `
      <p>Color grading is the process of altering and enhancing the color of a motion picture, video image, or still image. When done well, it can transform ordinary footage into something extraordinary.</p>
      
      <h2>Understanding Color Theory</h2>
      <p>Before diving into color grading, it's important to understand basic color theory. Colors can evoke different emotions and set the mood for your video.</p>
      
      <h2>Basic Color Correction vs. Creative Color Grading</h2>
      <p>Color correction fixes issues with your footage, ensuring proper exposure and white balance. Color grading is the creative process that follows, where you establish a specific look or feel.</p>
      
      <h2>Popular Color Grading Techniques</h2>
      <ul>
        <li>Orange and teal look (popular in Hollywood films)</li>
        <li>Vintage/film looks</li>
        <li>Monochromatic color schemes</li>
        <li>Split toning (different colors for shadows and highlights)</li>
      </ul>
      
      <h2>Tools for Color Grading</h2>
      <p>Most editing software includes color grading tools. DaVinci Resolve is considered the industry standard for color work, but Premiere Pro, Final Cut Pro, and even free options like Davinci Resolve Free offer powerful grading capabilities.</p>
    `,
    coverImage: "/placeholder.svg?height=720&width=1280",
    date: "March 28, 2025",
    author: "Jiwan",
    category: "Advanced Techniques",
    status: "published",
    slug: "color-grading-techniques",
    readTime: "10 min read",
  },
  {
    id: "4",
    title: "The Best Video Editing Software in 2025",
    excerpt: "A comprehensive comparison of the top video editing tools available this year.",
    content: `
      <p>With so many video editing options available, choosing the right software can be overwhelming. This guide breaks down the top contenders to help you make an informed decision.</p>
      
      <h2>Professional Options</h2>
      <ul>
        <li>Adobe Premiere Pro - Industry standard with comprehensive features</li>
        <li>Final Cut Pro - Apple's professional offering with excellent performance</li>
        <li>DaVinci Resolve - Powerful free version with industry-leading color tools</li>
        <li>Avid Media Composer - Standard in film and television production</li>
      </ul>
      
      <h2>Mid-Range Options</h2>
      <ul>
        <li>Adobe Premiere Elements - Simplified version of Premiere Pro</li>
        <li>Filmora - User-friendly with plenty of effects and templates</li>
        <li>PowerDirector - Feature-rich with good performance</li>
      </ul>
      
      <h2>Free Options</h2>
      <ul>
        <li>DaVinci Resolve Free - Most powerful free option</li>
        <li>Shotcut - Open-source with surprising capabilities</li>
        <li>iMovie - Free for Mac users, great for beginners</li>
      </ul>
      
      <h2>Mobile Editing</h2>
      <ul>
        <li>LumaFusion - Professional-level editing on iOS</li>
        <li>Adobe Premiere Rush - Cross-platform with cloud sync</li>
        <li>CapCut - Free with powerful features for short-form content</li>
      </ul>
    `,
    coverImage: "/placeholder.svg?height=720&width=1280",
    date: "March 20, 2025",
    author: "Jiwan",
    category: "Tools",
    status: "published",
    slug: "best-video-editing-software-2025",
    readTime: "12 min read",
  },
  {
    id: "5",
    title: "Creating Viral Short-Form Content for TikTok and Reels",
    excerpt: "Learn the strategies behind creating short videos that capture attention and go viral.",
    content: `
      <p>Short-form video has exploded in popularity. Creating content that stands out requires understanding the unique aspects of platforms like TikTok, Instagram Reels, and YouTube Shorts.</p>
      
      <h2>Hook Viewers Immediately</h2>
      <p>You have about 1-3 seconds to grab attention. Start with your most interesting visual or a compelling statement.</p>
      
      <h2>Follow Platform Trends</h2>
      <p>Each platform has its own trends, sounds, and challenges. Participating in these can boost your visibility.</p>
      
      <h2>Optimize for Mobile Viewing</h2>
      <p>Use large text, zoom in on important elements, and ensure your content is clear even on small screens.</p>
      
      <h2>Keep Pacing Fast</h2>
      <p>Short-form content thrives on quick cuts and rapid pacing. Avoid lingering on any shot too long.</p>
      
      <h2>Use Popular Music</h2>
      <p>Music can significantly increase engagement. Use trending sounds relevant to your content.</p>
      
      <h2>Create a Content Loop</h2>
      <p>The best short-form videos encourage multiple watches. Create content that's satisfying to watch on repeat.</p>
    `,
    coverImage: "/placeholder.svg?height=720&width=1280",
    date: "March 15, 2025",
    author: "Jiwan",
    category: "Short-Form",
    status: "published",
    slug: "viral-short-form-content",
    readTime: "7 min read",
  },
  {
    id: "6",
    title: "Audio Editing: The Secret to Professional Videos",
    excerpt: "Discover why audio quality matters just as much as video quality in your productions.",
    content: `
      <p>While viewers may forgive slightly imperfect visuals, poor audio can make even the most beautiful footage unwatchable. Great audio is the secret ingredient in professional-quality videos.</p>
      
      <h2>Recording Clean Audio</h2>
      <p>Start with the best possible source recording:</p>
      <ul>
        <li>Use external microphones whenever possible</li>
        <li>Record in quiet environments</li>
        <li>Use windscreens outdoors</li>
        <li>Monitor audio levels while recording</li>
      </ul>
      
      <h2>Basic Audio Cleanup</h2>
      <p>Even good recordings often need some adjustment:</p>
      <ul>
        <li>Noise reduction to remove background hum</li>
        <li>EQ to enhance voice clarity</li>
        <li>Compression to even out volume levels</li>
        <li>De-essing to reduce harsh "s" sounds</li>
      </ul>
      
      <h2>Music and Sound Effects</h2>
      <p>Background music and sound effects add depth to your videos:</p>
      <ul>
        <li>Choose music that matches your content's mood</li>
        <li>Balance music volume carefully with speech</li>
        <li>Use sound effects sparingly for impact</li>
        <li>Consider transitions between audio elements</li>
      </ul>
      
      <h2>Audio Mixing</h2>
      <p>The final step is mixing all audio elements together:</p>
      <ul>
        <li>Dialogue should typically be centered</li>
        <li>Music and ambient sounds can be stereo</li>
        <li>Maintain consistent levels throughout</li>
        <li>Export at appropriate quality settings</li>
      </ul>
    `,
    coverImage: "/placeholder.svg?height=720&width=1280",
    date: "March 8, 2025",
    author: "Jiwan",
    category: "Audio",
    status: "published",
    slug: "audio-editing-techniques",
    readTime: "9 min read",
  },
]

// Helper to generate a slug from a title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
}

// Helper to format the current date
export const formatDate = (): string => {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

// Class to handle blog post operations
class BlogService {
  private readonly STORAGE_KEY = "blog_posts"

  constructor() {
    // Initialize localStorage with sample posts if empty
    if (typeof window !== "undefined") {
      const storedPosts = localStorage.getItem(this.STORAGE_KEY)
      if (!storedPosts) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialPosts))
      }
    }
  }

  // Get all posts
  getAllPosts(): BlogPost[] {
    if (typeof window === "undefined") return initialPosts

    const posts = localStorage.getItem(this.STORAGE_KEY)
    const parsedPosts = posts ? JSON.parse(posts) : initialPosts

    // Sort posts by date (newest first)
    return parsedPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
  }

  // Get published posts only
  getPublishedPosts(): BlogPost[] {
    const posts = this.getAllPosts().filter((post) => post.status === "published")

    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
  }

  // Get a single post by slug
  getPostBySlug(slug: string): BlogPost | undefined {
    return this.getAllPosts().find((post) => post.slug === slug)
  }

  // Get a single post by ID
  getPostById(id: string): BlogPost | undefined {
    return this.getAllPosts().find((post) => post.id === id)
  }

  // Create a new post
  createPost(post: Omit<BlogPost, "id" | "date" | "slug">): BlogPost {
    const posts = this.getAllPosts()

    // Generate ID, date, and slug
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      date: formatDate(),
      slug: generateSlug(post.title),
    }

    // Save to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([newPost, ...posts]))

    return newPost
  }

  // Add this function to the BlogService class
  // This will help with migrating from base64 images to URLs
  isBase64Image(str: string): boolean {
    return str.startsWith("data:image/")
  }

  // Modify the updatePost method to handle image migration
  updatePost(id: string, updatedPost: Partial<BlogPost>): BlogPost | undefined {
    const posts = this.getAllPosts()
    const index = posts.findIndex((post) => post.id === id)

    if (index === -1) return undefined

    // If title changed, update the slug
    if (updatedPost.title && updatedPost.title !== posts[index].title) {
      updatedPost.slug = generateSlug(updatedPost.title)
    }

    // Update the post
    const updated = { ...posts[index], ...updatedPost }
    posts[index] = updated

    // Save to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts))

    return updated
  }

  // Delete a post
  deletePost(id: string): boolean {
    const posts = this.getAllPosts()
    const filteredPosts = posts.filter((post) => post.id !== id)

    if (filteredPosts.length === posts.length) return false

    // Save to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPosts))

    return true
  }

  // Calculate read time based on content length
  calculateReadTime(content: string): string {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }
}

// Export a singleton instance
export const blogService = new BlogService()

export const getAllPosts = () => {
  return blogService.getAllPosts()
}
