// Client-side configuration only
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
}

// Function to generate optimized image URLs (client-safe)
export const getOptimizedImageUrl = (
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string
    format?: string
    crop?: string
  } = {},
) => {
  const { width = 800, height = 600, quality = "auto", format = "auto", crop = "fill" } = options

  if (!cloudinaryConfig.cloudName) {
    return "/placeholder.svg"
  }

  const transformations = [`w_${width}`, `h_${height}`, `c_${crop}`, `q_${quality}`, `f_${format}`].join(",")

  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformations}/${publicId}`
}

// Upload from client (frontend)
export const uploadImageFromClient = async (
  file: File,
): Promise<{
  url: string
  public_id: string
}> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", cloudinaryConfig.uploadPreset!)
  formData.append("folder", "marconi/properties")

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const data = await response.json()
    return {
      url: data.secure_url,
      public_id: data.public_id,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    throw new Error("Failed to upload image")
  }
}
