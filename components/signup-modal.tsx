/**
 * Email Signup Modal Component
 *
 * Purpose: Shows a modal with message that feature is coming soon
 * Features:
 * - Email input field
 * - Sign up button for updates
 * - Close button functionality
 * - Accessible dialog pattern
 *
 * State Management:
 * - isOpen: Controls modal visibility
 * - email: Stores user's email input
 */

"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      // Reset after 2 seconds
      setTimeout(() => {
        setEmail("")
        setSubmitted(false)
        onClose()
      }, 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-card border border-border rounded-lg p-8 max-w-md w-full mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Thanks for signing up!</h2>
            <p className="text-muted-foreground">We'll keep you updated on this feature.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              The design-to-code feature is currently being worked on. Sign up below to get notified when it's ready!
            </p>

            {/* Email signup form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Get Notified
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
