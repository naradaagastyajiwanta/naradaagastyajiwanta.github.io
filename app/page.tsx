"use client"

import Link from "next/link"
import { ArrowRight, Mail, Play, Instagram, Youtube, MessageSquare } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import VideoCard from "@/components/video-card"
import ShortVideoCard from "@/components/short-video-card"
import { BlueGradientCircle, GlassmorphicCard } from "@/components/ui-elements"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { blogService, type BlogPost } from "@/lib/blog-service"
import ScrollAnimation from "@/components/scroll-animation"
import AnimatedText from "@/components/animated-text"
import Parallax from "@/components/parallax"
import AnimatedCard from "@/components/animated-card"
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animation"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Get the latest 3 published posts
  useEffect(() => {
    const posts = blogService.getPublishedPosts().slice(0, 3)
    setLatestPosts(posts)

    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Decorative Elements with animation */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1.5, delay: 0.2 }}>
        <BlueGradientCircle position="left" size="lg" opacity={0.2} />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1.5, delay: 0.4 }}>
        <BlueGradientCircle position="right" size="lg" opacity={0.2} />
      </motion.div>

      <Header />

      {/* Hero Section with parallax and text animation */}
      <section className="container py-24 md:py-32 relative" ref={heroRef}>
        <motion.div style={{ opacity, scale }} className="absolute inset-0 pointer-events-none" />
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div className="space-y-2" variants={fadeUp}>
              <AnimatedText
                text={t.heroTitle}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
                type="words"
              />
              <motion.p className="max-w-[600px] text-gray-500 md:text-xl" variants={fadeUp}>
                {t.heroDescription}
              </motion.p>
            </motion.div>
            <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={fadeUp}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t.viewMyWork}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t.contactMe}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassmorphicCard className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
              <motion.div
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button size="icon" className="h-16 w-16 rounded-full bg-blue-500 hover:bg-blue-600">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                    >
                      <Play className="h-8 w-8 fill-white text-white" />
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.img
                src="/placeholder.svg?height=720&width=1280"
                alt="Featured video thumbnail"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section with scroll animations */}
      <section id="work" className="bg-gray-50/80 backdrop-blur-sm py-16 md:py-24 relative">
        <div className="container">
          <ScrollAnimation variants={fadeUp}>
            <div className="mb-12 text-center">
              <AnimatedText
                text={t.featuredWorkTitle}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                delay={0.1}
              />
              <motion.p
                className="mx-auto mt-4 max-w-[700px] text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t.featuredWorkDescription}
              </motion.p>
            </div>
          </ScrollAnimation>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Dawnna - Sales Strategist & Coach",
                category: language === "id" ? t.corporate : "Corporate",
                thumbnail: `https://img.youtube.com/vi/Pes8IAkVLpQ/maxresdefault.jpg`,
                duration: language === "id" ? t.trialEdit : "Trial Edit",
                videoId: "Pes8IAkVLpQ",
              },
              {
                title: "Yoav - YouTube Video Edit",
                category: language === "id" ? t.showcase : "Showcase",
                thumbnail: `https://img.youtube.com/vi/ifXYgtE3zj0/maxresdefault.jpg`,
                duration: language === "id" ? t.showcase : "Showcase",
                videoId: "ifXYgtE3zj0",
              },
              {
                title: "Wonderfulwebsite - VSL Edit",
                category: "VSL",
                thumbnail: `https://img.youtube.com/vi/gUFpvhAcuL8/maxresdefault.jpg`,
                duration: language === "id" ? t.showcase : "Showcase",
                videoId: "gUFpvhAcuL8",
              },
              {
                title: "YouTube Video - Trial Edit",
                category: language === "id" ? t.trialEdit : "Trial Edit",
                thumbnail: `https://img.youtube.com/vi/X2QYNhI-h6U/maxresdefault.jpg`,
                duration: language === "id" ? t.showcase : "Showcase",
                videoId: "X2QYNhI-h6U",
              },
              {
                title: "Case Value - Company Profile",
                category: language === "id" ? t.companyProfile : "Company Profile",
                thumbnail: `https://img.youtube.com/vi/7HeahSXxBoI/maxresdefault.jpg`,
                duration: language === "id" ? t.showcase : "Showcase",
                videoId: "7HeahSXxBoI",
              },
              {
                title: "QuantaInvest - Faceless Youtube Video Edit",
                category: language === "id" ? t.showcase : "Showcase",
                thumbnail: `https://img.youtube.com/vi/eIqipwf-V-I/maxresdefault.jpg`,
                duration: language === "id" ? t.showcase : "Showcase",
                videoId: "eIqipwf-V-I",
              },
            ].map((video, index) => (
              <motion.div key={index} variants={fadeUp}>
                <VideoCard
                  title={video.title}
                  category={video.category}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  videoId={video.videoId}
                />
              </motion.div>
            ))}
          </motion.div>

          <ScrollAnimation>
            <div className="mt-12 text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                  {t.viewAllProjects}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Short Videos Section with staggered animations */}
      <section id="shorts" className="py-16 md:py-24 relative">
        <div className="container">
          <ScrollAnimation variants={fadeUp}>
            <div className="mb-12 text-center">
              <AnimatedText
                text={t.shortVideosTitle}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                delay={0.1}
              />
              <motion.p
                className="mx-auto mt-4 max-w-[700px] text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t.shortVideosDescription}
              </motion.p>
            </div>
          </ScrollAnimation>

          <motion.div
            className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Visual Effects Showcase",
                category: language === "id" ? t.short : "Short",
                thumbnail: `https://img.youtube.com/vi/4VLSUlM8UvI/maxresdefault.jpg`,
                duration: language === "id" ? t.short : "Short",
                videoId: "4VLSUlM8UvI",
              },
              {
                title: "Short Video Edit",
                category: language === "id" ? t.short : "Short",
                thumbnail: `https://img.youtube.com/vi/RaW2M4Y8k20/maxresdefault.jpg`,
                duration: language === "id" ? t.short : "Short",
                videoId: "RaW2M4Y8k20",
              },
              {
                title: "Short Video Edit",
                category: language === "id" ? t.short : "Short",
                thumbnail: `https://img.youtube.com/vi/Xus_I2oUI-A/maxresdefault.jpg`,
                duration: language === "id" ? t.short : "Short",
                videoId: "Xus_I2oUI-A",
              },
              {
                title: "One Earth School",
                category: language === "id" ? t.short : "Short Video Edit",
                thumbnail: `https://img.youtube.com/vi/Wq-XnQqgNCs/maxresdefault.jpg`,
                duration: language === "id" ? t.short : "Short",
                videoId: "Wq-XnQqgNCs",
              },
              {
                title: "Food Review",
                category: language === "id" ? t.short : "Short",
                thumbnail: "/placeholder.svg?height=1920&width=1080",
                duration: "0:20",
              },
              {
                title: "Tech Unboxing",
                category: language === "id" ? t.short : "Short",
                thumbnail: "/placeholder.svg?height=1920&width=1080",
                duration: "0:60",
              },
            ].map((video, index) => (
              <motion.div key={index} variants={fadeUp}>
                <ShortVideoCard
                  title={video.title}
                  category={video.category}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  videoId={video.videoId}
                />
              </motion.div>
            ))}
          </motion.div>

          <ScrollAnimation>
            <div className="mt-12 text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                  {t.viewAllShorts}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Blog Section Preview with parallax effects */}
      <section className="bg-gray-50/80 backdrop-blur-sm py-16 md:py-24 relative">
        <div className="container">
          <ScrollAnimation variants={fadeUp}>
            <div className="mb-12 text-center">
              <AnimatedText
                text={t.latestArticlesTitle}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                delay={0.1}
              />
              <motion.p
                className="mx-auto mt-4 max-w-[700px] text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t.latestArticlesDescription}
              </motion.p>
            </div>
          </ScrollAnimation>

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {latestPosts.length > 0 ? (
              latestPosts.map((post, index) => (
                <motion.div key={post.id} variants={fadeUp}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <AnimatedCard delay={index * 0.1}>
                      <div className="aspect-video overflow-hidden">
                        <motion.img
                          src={post.coverImage || "/placeholder.svg?height=720&width=1280"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-sm font-medium text-blue-500 mb-2">{post.category}</div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 line-clamp-2">{post.excerpt}</p>
                      </div>
                    </AnimatedCard>
                  </Link>
                </motion.div>
              ))
            ) : (
              // Fallback content if no posts are available
              <>
                {[
                  {
                    title: "10 Essential Video Editing Tips for Beginners",
                    category: "Tutorials",
                    excerpt:
                      "Learn the fundamental techniques that will elevate your video editing skills from day one.",
                  },
                  {
                    title: "How to Create Engaging YouTube Thumbnails",
                    category: "YouTube",
                    excerpt:
                      "Discover the secrets to creating thumbnails that drive clicks and views on your YouTube videos.",
                  },
                  {
                    title: "Color Grading: Taking Your Videos to the Next Level",
                    category: "Advanced Techniques",
                    excerpt: "Master the art of color grading to give your videos a professional and cinematic look.",
                  },
                ].map((post, index) => (
                  <motion.div key={index} variants={fadeUp}>
                    <Link href="/blog" className="group block h-full">
                      <AnimatedCard delay={index * 0.1}>
                        <div className="aspect-video overflow-hidden">
                          <motion.img
                            src="/placeholder.svg?height=720&width=1280"
                            alt={post.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <div className="p-6">
                          <div className="text-sm font-medium text-blue-500 mb-2">{post.category}</div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-500 line-clamp-2">{post.excerpt}</p>
                        </div>
                      </AnimatedCard>
                    </Link>
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>

          <ScrollAnimation>
            <div className="mt-12 text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="/blog">
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    {t.viewAllArticles}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* About Section with alternating animations */}
      <section id="about" className="py-16 md:py-24 relative">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <ScrollAnimation variants={slideInLeft}>
              <Parallax speed={0.1} direction="up">
                <GlassmorphicCard className="overflow-hidden rounded-lg">
                  <motion.img
                    src="/images/JiwanBW.png"
                    alt="Jiwan - Video Editor"
                    className="aspect-square w-full object-cover"
                    initial={{ scale: 1.1, filter: "blur(5px)" }}
                    animate={{ scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8 }}
                  />
                </GlassmorphicCard>
              </Parallax>
            </ScrollAnimation>

            <ScrollAnimation variants={slideInRight}>
              <div className="flex flex-col justify-center space-y-4">
                <div>
                  <AnimatedText
                    text={t.aboutMeTitle}
                    className="text-3xl font-bold tracking-tighter sm:text-4xl"
                    delay={0.1}
                  />
                  <motion.p
                    className="mt-4 text-gray-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {t.aboutMeDescription1}
                  </motion.p>
                  <motion.p
                    className="mt-4 text-gray-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {t.aboutMeDescription2}
                  </motion.p>
                </div>
                <motion.div
                  className="grid gap-2 sm:grid-cols-2"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  {[
                    { value: "5+", label: t.yearsExperience },
                    { value: "50+", label: t.projectsCompleted },
                    { value: "5+", label: t.clients },
                    { value: "50+", label: t.happyClients },
                  ].map((stat, index) => (
                    <motion.div key={index} variants={fadeUp}>
                      <GlassmorphicCard className="p-4">
                        <motion.div
                          className="text-4xl font-bold text-blue-500"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                      </GlassmorphicCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Contact Section with form animations */}
      <section id="contact" className="bg-gray-50/80 backdrop-blur-sm py-16 md:py-24 relative">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <ScrollAnimation variants={fadeUp}>
              <div className="text-center mb-12">
                <AnimatedText
                  text={t.workTogetherTitle}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  delay={0.1}
                />
                <motion.p
                  className="mx-auto mt-4 max-w-[600px] text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {t.workTogetherDescription}
                </motion.p>
              </div>
            </ScrollAnimation>

            <div className="grid gap-8 md:grid-cols-2">
              <ScrollAnimation variants={slideInLeft}>
                <GlassmorphicCard className="p-6">
                  <h3 className="text-xl font-semibold mb-6">{t.contactInformation}</h3>
                  <motion.div className="space-y-4" initial="hidden" animate="visible" variants={staggerContainer}>
                    {[
                      { icon: Mail, text: "jiwanta09@gmail.com", href: "mailto:jiwanta09@gmail.com" },
                      { icon: Instagram, text: "@itisjiwan", href: "https://instagram.com/itisjiwan" },
                      {
                        icon: () => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="text-blue-500"
                            viewBox="0 0 448 512"
                          >
                            <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                          </svg>
                        ),
                        text: "@itisjiwan",
                        href: "https://tiktok.com/@itisjiwan",
                      },
                      { icon: Youtube, text: "youtube.com/@itisjiwan", href: "https://www.youtube.com/@itisjiwan" },
                      { icon: MessageSquare, text: "+62 851-2108-4588", href: "https://wa.me/6285121084588" },
                    ].map((item, index) => (
                      <motion.div key={index} className="flex items-center gap-3" variants={fadeUp}>
                        <motion.div
                          className="bg-blue-100 p-2 rounded-full"
                          whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                        >
                          {typeof item.icon === "function" ? (
                            <item.icon className="h-5 w-5 text-blue-500" />
                          ) : (
                            <item.icon className="h-5 w-5 text-blue-500" />
                          )}
                        </motion.div>
                        <motion.a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-blue-500"
                          whileHover={{ x: 3 }}
                        >
                          {item.text}
                        </motion.a>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-semibold mb-4">{t.followMe}</h3>
                    <div className="flex gap-4">
                      {[
                        { icon: Instagram, href: "https://instagram.com/itisjiwan" },
                        {
                          icon: () => (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="text-blue-500"
                              viewBox="0 0 448 512"
                            >
                              <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                            </svg>
                          ),
                          href: "https://tiktok.com/@itisjiwan",
                        },
                        { icon: Youtube, href: "https://www.youtube.com/@itisjiwan" },
                        { icon: MessageSquare, href: "https://wa.me/6285121084588" },
                      ].map((item, index) => (
                        <motion.a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/50 hover:bg-blue-50 p-3 rounded-full transition-colors"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                        >
                          {typeof item.icon === "function" ? (
                            <item.icon />
                          ) : (
                            <item.icon className="h-5 w-5 text-blue-500" />
                          )}
                          <span className="sr-only">Social Media</span>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </GlassmorphicCard>
              </ScrollAnimation>

              <ScrollAnimation variants={slideInRight}>
                <GlassmorphicCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{t.sendMessage}</h3>
                  <motion.form
                    action="mailto:jiwanta09@gmail.com"
                    method="post"
                    encType="text/plain"
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                  >
                    <motion.div className="grid gap-4" variants={fadeUp}>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          {t.name}
                        </label>
                        <motion.input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          {t.email}
                        </label>
                        <motion.input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.message}
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        whileFocus={{ scale: 1.01 }}
                      ></motion.textarea>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 mb-2">
                          {t.sendMessageButton}
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <a
                          href="https://wa.me/6285121084588"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button
                            type="button"
                            className="w-full bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2"
                          >
                            <MessageSquare className="h-5 w-5" />
                            {t.contactViaWhatsApp}
                          </Button>
                        </a>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                </GlassmorphicCard>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
