"use client"
import { Button } from "@/components/ui-elements"

export default function BlogFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Database Connection Error</h2>
      <p className="mb-6 text-gray-600 max-w-md">
        We couldn't connect to the database. This could be because the DATABASE_URL environment variable is not set or
        the database is not accessible.
      </p>
      <Button onClick={() => (window.location.href = "/")}>Return to Home</Button>
    </div>
  )
}
