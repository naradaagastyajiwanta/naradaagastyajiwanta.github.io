"use client"

import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlueGradientCircle, GlassmorphicCard } from "@/components/ui-elements"
import AdminHeader from "@/components/admin-header"
import ProtectedRoute from "@/components/protected-route"
import { getAllVideoScripts } from "@/lib/actions/ai-actions"

async function VideoScripts() {
  const result = await getAllVideoScripts()
  const scripts = result.success ? result.data : []

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
            <h1 className="text-3xl font-bold">Video Scripts</h1>
          </div>

          <Link href="/admin/ai?tab=script">
            <Button className="bg-blue-500 hover:bg-blue-600">Create New Script</Button>
          </Link>
        </div>

        <GlassmorphicCard className="overflow-hidden">
          {scripts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No scripts found. Create your first script using the AI Script Generator.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scripts.map((script) => (
                    <tr key={script.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{script.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {script.brief.substring(0, 60)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(script.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/scripts/${script.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const element = document.createElement("a")
                              const file = new Blob([script.script_content], { type: "text/plain" })
                              element.href = URL.createObjectURL(file)
                              element.download = `Script_${script.title.replace(/\s+/g, "_")}.txt`
                              document.body.appendChild(element)
                              element.click()
                              document.body.removeChild(element)
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassmorphicCard>
      </main>
    </div>
  )
}

// Wrap the scripts page with the protected route
export default function VideoScriptsPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
        <VideoScripts />
      </Suspense>
    </ProtectedRoute>
  )
}
