/**
 * Code Display Component
 *
 * Purpose: Displays generated React/TypeScript code
 * Features:
 * - Read-only code display with syntax highlighting
 * - Copy to clipboard functionality
 * - Line numbers
 * - Monospace font for code readability
 *
 * State Management:
 * - copied: Tracks copy-to-clipboard success state
 *
 * Note: In production, this would receive generated code from an API
 * Currently shows placeholder/example code
 */

"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

// Example generated code (in production, this would come from AI generation)
const EXAMPLE_CODE = `import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ComponentProps {
  title: string
  description: string
  onAction?: () => void
}

export default function GeneratedComponent({
  title,
  description,
  onAction
}: ComponentProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      <Button onClick={onAction}>
        Take Action
      </Button>
    </Card>
  )
}`

export default function CodeDisplay() {
  const [copied, setCopied] = useState(false)

  // Copy code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EXAMPLE_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Generated Code</h3>
        <Button variant="secondary" size="sm" onClick={handleCopy} className="gap-2">
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Code
            </>
          )}
        </Button>
      </div>

      {/* Code display area - read-only */}
      <div className="flex-1 border border-border rounded-lg overflow-hidden bg-[var(--color-code-bg)]">
        <div className="h-full overflow-auto">
          <pre className="p-4 text-sm font-mono leading-relaxed">
            <code className="text-[var(--color-code-text)]">
              {EXAMPLE_CODE.split("\n").map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-muted-foreground select-none w-10 inline-block text-right pr-4">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-3 text-xs text-muted-foreground">
        <p>💡 Upload a design file to generate React/TypeScript code automatically</p>
      </div>
    </div>
  )
}
