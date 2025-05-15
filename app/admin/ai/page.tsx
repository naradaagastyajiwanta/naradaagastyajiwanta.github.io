import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlueGradientCircle } from "@/components/ui-elements"
import AdminHeader from "@/components/admin-header"
import ProtectedRoute from "@/components/protected-route"
import AIBlogGenerator from "@/components/ai-blog-generator"
import VideoScriptGenerator from "@/components/video-script-generator"
import QuoteGenerator from "@/components/quote-generator"
import PortfolioSearch from "@/components/portfolio-search"

function AITools() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-gray-50">
      {/* Decorative Elements */}
      <BlueGradientCircle position="left" size="lg" opacity={0.1} />
      <BlueGradientCircle position="right" size="lg" opacity={0.1} />

      <AdminHeader />

      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Tools</h1>
          <p className="text-gray-500 mt-2">
            Leverage AI to streamline your workflow and enhance your video editing business
          </p>
        </div>

        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="blog">Blog Generator</TabsTrigger>
            <TabsTrigger value="script">Script Generator</TabsTrigger>
            <TabsTrigger value="quote">Quote Generator</TabsTrigger>
            <TabsTrigger value="search">Portfolio Search</TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="space-y-6">
            <Suspense fallback={<div>Loading...</div>}>
              <AIBlogGenerator />
            </Suspense>
          </TabsContent>

          <TabsContent value="script" className="space-y-6">
            <Suspense fallback={<div>Loading...</div>}>
              <VideoScriptGenerator />
            </Suspense>
          </TabsContent>

          <TabsContent value="quote" className="space-y-6">
            <Suspense fallback={<div>Loading...</div>}>
              <QuoteGenerator />
            </Suspense>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Suspense fallback={<div>Loading...</div>}>
              <PortfolioSearch />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Wrap the AI tools page with the protected route
export default function AIToolsPage() {
  return (
    <ProtectedRoute>
      <AITools />
    </ProtectedRoute>
  )
}
