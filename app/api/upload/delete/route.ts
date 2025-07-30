import { type NextRequest, NextResponse } from "next/server"
import { deleteFromCloudinary, extractPublicIdFromUrl } from "@/lib/cloudinary-server"

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get("url")
    const publicId = searchParams.get("publicId")

    // Need either URL or public ID
    if (!imageUrl && !publicId) {
      return NextResponse.json({ 
        error: "Either 'url' or 'publicId' parameter is required" 
      }, { status: 400 })
    }

    let extractedPublicId: string | null = publicId

    // If we have a URL but no publicId, extract it
    if (imageUrl && !publicId) {
      extractedPublicId = extractPublicIdFromUrl(imageUrl)
      
      if (!extractedPublicId) {
        return NextResponse.json({ 
          error: "Could not extract public ID from URL" 
        }, { status: 400 })
      }
    }

    if (!extractedPublicId) {
      return NextResponse.json({ 
        error: "No valid public ID found" 
      }, { status: 400 })
    }

    // Delete from Cloudinary
    const result = await deleteFromCloudinary(extractedPublicId)

    return NextResponse.json({ 
      success: true,
      result,
      publicId: extractedPublicId 
    })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : "Deletion failed" 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls, publicIds } = body

    if (!urls && !publicIds) {
      return NextResponse.json({ 
        error: "Either 'urls' or 'publicIds' array is required" 
      }, { status: 400 })
    }

    let idsToDelete: string[] = []

    if (publicIds && Array.isArray(publicIds)) {
      idsToDelete = publicIds
    } else if (urls && Array.isArray(urls)) {
      // Extract public IDs from URLs
      idsToDelete = urls
        .map(url => extractPublicIdFromUrl(url))
        .filter(Boolean) as string[]
    }

    if (idsToDelete.length === 0) {
      return NextResponse.json({ 
        error: "No valid public IDs found" 
      }, { status: 400 })
    }

    // Delete multiple images
    const deletePromises = idsToDelete.map(async (publicId) => {
      try {
        await deleteFromCloudinary(publicId)
        return { publicId, success: true }
      } catch (error) {
        console.error(`Failed to delete ${publicId}:`, error)
        return { 
          publicId, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }
    })

    const results = await Promise.all(deletePromises)
    const successful = results.filter(r => r.success)
    const failed = results.filter(r => !r.success)

    return NextResponse.json({ 
      success: true,
      deleted: successful.length,
      failed: failed.length,
      results: {
        successful: successful.map(r => r.publicId),
        failed: failed.map(r => ({ publicId: r.publicId, error: r.error }))
      }
    })
  } catch (error) {
    console.error("Bulk delete error:", error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : "Bulk deletion failed" 
    }, { status: 500 })
  }
}
