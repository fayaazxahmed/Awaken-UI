import { NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import { join } from "path"
import { existsSync } from "fs"
import { mkdir } from "fs/promises"

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json()

    if (!filePath) {
      return NextResponse.json(
        { error: "File path is required" },
        { status: 400 }
      )
    }

    // Ensure output directory exists
    const outputDir = join(process.cwd(), "output")
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true })
    }

    // Execute chandra command: chandra {filePath} ./output
    const command = `chandra "${filePath}" "${outputDir}"`
    
    const { stdout, stderr } = await execAsync(command)

    return NextResponse.json({
      success: true,
      output: stdout,
      error: stderr || null,
    })
  } catch (error: any) {
    console.error("Error running chandra command:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to run chandra command",
        stderr: error.stderr || null,
      },
      { status: 500 }
    )
  }
}

