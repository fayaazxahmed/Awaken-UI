/**
 * Main page component for Awaken
 *
 * Purpose: Landing page with two main sections:
 * 1. File upload zone (left) - Accepts design files (.png, .fig, etc.)
 * 2. Code display area (right) - Shows generated React/TypeScript code (read-only with copy)
 *
 * Layout: Side-by-side boxes on desktop, stacked on mobile
 */

import FileUploadZone from "@/components/file-upload-zone"
import CodeDisplay from "@/components/code-display"
import { TextType } from "@/components/text-type"
import CrescentMoonLogo from "@/components/crescent-moon-logo"
import { Plasma } from "@/components/plasma"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Plasma background overlay */}
      <div className="fixed inset-0 z-0">
        <Plasma />
      </div>
      {/* Header with branding */}
      <header className="border-b border-border bg-black/40 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CrescentMoonLogo />
            <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Awaken
            </h1>
          </div>

          <div className="fixed top-6 right-6 z-50">
            <p className="text-lg font-medium font-[family-name:var(--font-share-tech-mono)]">
              <TextType text="Turn designs to code, instantly" speed={100} cursor />
            </p>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block"></p>
        </div>
      </header>

      {/* Main content area with two boxes */}
      <main className="flex-1 container mx-auto px-4 py-16 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 text-balance">Transform Your Designs into React Code</h2>
          <p className="text-gray-300 text-balance">
            Upload your UI/UX design files and get production-ready React components
          </p>
        </div>

        {/* Two-column layout: Upload (left) and Code (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left box: File upload zone with purple glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-lg" />
            <div className="relative z-10">
              <FileUploadZone />
            </div>
          </div>

          {/* Right box: Generated code display with purple glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-lg" />
            <div className="relative">
              <CodeDisplay />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
