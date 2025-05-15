"use client"

import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlueGradientCircle, GlassmorphicCard } from "@/components/ui-elements"
import AdminHeader from "@/components/admin-header"
import ProtectedRoute from "@/components/protected-route"
import { getAllProjectQuotes } from "@/lib/actions/ai-actions"

async function ProjectQuotes() {
  const result = await getAllProjectQuotes()
  const quotes = result.success ? result.data : []

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-gray-50">
      {/* Decorative Elements */}
      <BlueGradientCircle position="left" size="lg" opacity={0.1} />
      <BlueGradientCircle position="right" size="lg" opacity={0.1} />

      <AdminHeader />

      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/admin/ai">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to AI Tools
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Project Quotes</h1>
          </div>

          <Link href="/admin/ai?tab=quote">
            <Button className="bg-blue-500 hover:bg-blue-600">Create New Quote</Button>
          </Link>
        </div>

        <GlassmorphicCard className="overflow-hidden">
          {quotes.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No quotes found. Create your first quote using the AI Quote Generator.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimated Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotes.map((quote) => {
                    const projectDetails =
                      typeof quote.project_details === "string"
                        ? JSON.parse(quote.project_details)
                        : quote.project_details

                    return (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{quote.client_name}</div>
                          <div className="text-sm text-gray-500">{new Date(quote.created_at).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {projectDetails.projectType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${Number(quote.estimated_price).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {quote.estimated_timeline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              quote.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : quote.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/quotes/${quote.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const element = document.createElement("a")
                                const file = new Blob([quote.quote_content], { type: "text/plain" })
                                element.href = URL.createObjectURL(file)
                                element.download = `Quote_${quote.client_name.replace(/\s+/g, "_")}.txt`
                                document.body.appendChild(element)
                                element.click()
                                document.body.removeChild(element)
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const subject = `Video Editing Quote for ${quote.client_name}`
                                const body = encodeURIComponent(quote.quote_content)
                                window.location.href = `mailto:?subject=${subject}&body=${body}`
                              }}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </GlassmorphicCard>
      </main>
    </div>
  )
}

// Wrap the quotes page with the protected route
export default function ProjectQuotesPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
        <ProjectQuotes />
      </Suspense>
    </ProtectedRoute>
  )
}
