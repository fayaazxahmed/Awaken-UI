/**
 * File Upload Zone Component
 *
 * Purpose: Handles file uploads for design files
 * Features:
 * - Drag and drop support
 * - Click to browse files
 * - Accepts .png, .jpg, .jpeg, .fig, .svg, .pdf
 * - Visual feedback for drag states
 * - File preview after upload
 *
 * State Management:
 * - uploadedFile: Currently uploaded file
 * - isDragging: Visual feedback during drag operations
 */

"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileImage, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import SignupModal from "./signup-modal"

export default function FileUploadZone() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Handle file selection (both drag-drop and click)
  const handleFile = useCallback((file: File) => {
    // Validate file type
    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
      "application/pdf",
      "application/x-figma",
    ]

    if (validTypes.includes(file.type) || file.name.endsWith(".fig")) {
      setUploadedFile(file)

      // Create preview for image files
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        setPreviewUrl(null)
      }
    } else {
      alert("Please upload a valid design file (.png, .jpg, .fig, .svg, .pdf)")
    }
  }, [])

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    setShowModal(true)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShowModal(true)
    e.target.value = ""
  }, [])

  const handleRemoveFile = useCallback(() => {
    setUploadedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }, [previewUrl])

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Upload Design</h3>
          <span className="text-xs text-muted-foreground">.png, .jpg, .fig, .svg, .pdf</span>
        </div>

        <div
          className={`flex-1 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
            isDragging ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => setShowModal(true)}
        >
          {uploadedFile ? (
            // File uploaded state
            <div className="h-full p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded flex items-center justify-center">
                    <FileImage className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {previewUrl && (
                <div className="flex-1 rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}

              {!previewUrl && (
                <div className="flex-1 rounded-lg bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">File uploaded successfully</p>
                </div>
              )}
            </div>
          ) : (
            // Empty state - ready for upload
            <label className="h-full flex flex-col items-center justify-center cursor-pointer p-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-accent" />
              </div>
              <p className="text-lg font-medium text-foreground mb-2">Drop your design file here</p>
              <p className="text-sm text-muted-foreground mb-4 text-center">or click to browse from your computer</p>
              <Button variant="secondary" className="pointer-events-none">
                Choose File
              </Button>
              <input
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.fig,.svg,.pdf"
                onChange={handleFileInput}
              />
            </label>
          )}
        </div>
      </div>

      <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
