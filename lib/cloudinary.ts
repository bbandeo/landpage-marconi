// Client-side configuration only
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
}

// Validate client configuration
const validateClientConfig = () => {
  if (!cloudinaryConfig.cloudName) {
    console.warn('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable')
    return false
  }
  return true
}

// Type definitions
export interface ImageOptimizationOptions {
  width?: number
  height?: number
  quality?: string | number
  format?: string
  crop?: string
  gravity?: string
  radius?: string | number
  effects?: string[]
}

export interface ClientUploadResult {
  url: string
  public_id: string
  width?: number
  height?: number
  format?: string
  bytes?: number
}

// Function to generate optimized image URLs (client-safe)
export const getOptimizedImageUrl = (
  publicId: string,
  options: ImageOptimizationOptions = {},
): string => {
  const { 
    width = 800, 
    height = 600, 
    quality = "auto", 
    format = "auto", 
    crop = "fill",
    gravity,
    radius,
    effects = []
  } = options

  if (!validateClientConfig() || !publicId) {
    return "/placeholder.svg"
  }

  const transformations: string[] = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `q_${quality}`,
    `f_${format}`
  ]

  if (gravity) {
    transformations.push(`g_${gravity}`)
  }

  if (radius) {
    transformations.push(`r_${radius}`)
  }

  effects.forEach(effect => {
    transformations.push(`e_${effect}`)
  })

  const transformationString = transformations.join(",")

  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformationString}/${publicId}`
}

// Generate responsive image URLs for different screen sizes
export const getResponsiveImageUrls = (publicId: string, baseOptions: ImageOptimizationOptions = {}) => {
  return {
    mobile: getOptimizedImageUrl(publicId, { ...baseOptions, width: 400, height: 300 }),
    tablet: getOptimizedImageUrl(publicId, { ...baseOptions, width: 768, height: 576 }),
    desktop: getOptimizedImageUrl(publicId, { ...baseOptions, width: 1200, height: 800 }),
    thumbnail: getOptimizedImageUrl(publicId, { ...baseOptions, width: 150, height: 150, crop: "thumb" }),
  }
}

// Upload from client (frontend) - Note: Prefer server-side uploads for security
export const uploadImageFromClient = async (
  file: File,
): Promise<ClientUploadResult> => {
  if (!validateClientConfig()) {
    throw new Error("Cloudinary configuration is incomplete")
  }

  if (!cloudinaryConfig.uploadPreset) {
    throw new Error("Upload preset is required for client-side uploads")
  }

  // Validate file
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}. Only JPEG, PNG, and WebP are allowed.`)
  }

  if (file.size > maxSize) {
    throw new Error(`File is too large. Maximum size is 5MB.`)
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", cloudinaryConfig.uploadPreset)
  formData.append("folder", "marconi/properties")
  formData.append("tags", "marconi,property,client-upload")

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || `Upload failed with status: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.secure_url) {
      throw new Error("Invalid response from Cloudinary - no secure URL")
    }

    return {
      url: data.secure_url,
      public_id: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    
    if (error instanceof Error) {
      throw error
    }
    
    throw new Error("Failed to upload image")
  }
}

// Utility function to check if URL is from Cloudinary
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com')
}

// Extract public ID from Cloudinary URL (client-side version)
export const extractPublicId = (url: string): string | null => {
  if (!isCloudinaryUrl(url)) {
    return null
  }

  try {
    const matches = url.match(/\/(?:v\d+\/)?([^\.]+)/)
    return matches ? matches[1] : null
  } catch (error) {
    console.error("Error extracting public ID from URL:", error)
    return null
  }
}
