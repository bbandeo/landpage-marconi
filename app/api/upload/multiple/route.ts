import { type NextRequest, NextResponse } from "next/server"
import { uploadToCloudinary } from "@/lib/cloudinary-server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    const maxSize = 5 * 1024 * 1024 // 5MB

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ 
          error: `Invalid file type: ${file.type}. Only JPEG, PNG, and WebP are allowed.` 
        }, { status: 400 })
      }
      
      if (file.size > maxSize) {
        return NextResponse.json({ 
          error: `File ${file.name} is too large. Maximum size is 5MB.` 
        }, { status: 400 })
      }
    }

    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      return uploadToCloudinary(buffer, {
        folder: "marconi/properties",
      })
    })

    const results = await Promise.all(uploadPromises)

    // Extract URLs for the PropertyForm component
    const urls = results.map(result => result.url)

    return NextResponse.json({ 
      success: true,
      urls,
      uploads: results 
    })
  } catch (error) {
    console.error("Multiple upload error:", error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : "Upload failed" 
    }, { status: 500 })
  }
}
