/**
 * Image Utility Functions
 * Provides client-side image compression, resizing, and optimization
 */

export interface ImageCompressionOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
  maxSizeKB?: number
}

export interface ImageProcessingResult {
  file: File
  originalSize: number
  compressedSize: number
  compressionRatio: number
  width: number
  height: number
  format: string
}

/**
 * Compress and resize an image file
 */
export const compressImage = async (
  file: File,
  options: ImageCompressionOptions = {}
): Promise<ImageProcessingResult> => {
  const {
    maxWidth = 1200,
    maxHeight = 800,
    quality = 0.8,
    format = 'jpeg',
    maxSizeKB = 500
  } = options

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    if (!ctx) {
      reject(new Error('Canvas context not available'))
      return
    }

    img.onload = () => {
      try {
        // Calculate new dimensions while maintaining aspect ratio
        const { width: newWidth, height: newHeight } = calculateDimensions(
          img.width,
          img.height,
          maxWidth,
          maxHeight
        )

        // Set canvas dimensions
        canvas.width = newWidth
        canvas.height = newHeight

        // Draw and compress the image
        ctx.fillStyle = '#FFFFFF' // White background for JPEGs
        ctx.fillRect(0, 0, newWidth, newHeight)
        ctx.drawImage(img, 0, 0, newWidth, newHeight)

        // Try different quality levels if size is too large
        compressWithQuality(canvas, file.name, format, quality, maxSizeKB)
          .then(result => {
            const compressionRatio = ((file.size - result.size) / file.size) * 100

            resolve({
              file: result,
              originalSize: file.size,
              compressedSize: result.size,
              compressionRatio: Math.round(compressionRatio * 100) / 100,
              width: newWidth,
              height: newHeight,
              format: result.type
            })
          })
          .catch(reject)

      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    // Create object URL for the image
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Calculate new dimensions maintaining aspect ratio
 */
const calculateDimensions = (
  currentWidth: number,
  currentHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } => {
  let { width, height } = { width: currentWidth, height: currentHeight }

  // Scale down if larger than max dimensions
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height)
    width = Math.round(width * ratio)
    height = Math.round(height * ratio)
  }

  return { width, height }
}

/**
 * Compress with adjustable quality to meet size requirements
 */
const compressWithQuality = async (
  canvas: HTMLCanvasElement,
  fileName: string,
  format: string,
  initialQuality: number,
  maxSizeKB: number
): Promise<File> => {
  let quality = initialQuality
  let attempts = 0
  const maxAttempts = 5

  while (attempts < maxAttempts) {
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, `image/${format}`, quality)
    })

    if (!blob) {
      throw new Error('Failed to create blob from canvas')
    }

    // Check if size is acceptable
    const sizeKB = blob.size / 1024
    
    if (sizeKB <= maxSizeKB || quality <= 0.1) {
      // Size is acceptable or we've reached minimum quality
      const extension = format === 'jpeg' ? 'jpg' : format
      const newFileName = fileName.replace(/\.[^/.]+$/, `.${extension}`)
      
      return new File([blob], newFileName, { 
        type: `image/${format}`,
        lastModified: Date.now()
      })
    }

    // Reduce quality for next attempt
    quality -= 0.1
    attempts++
  }

  throw new Error('Could not compress image to target size')
}

/**
 * Validate image file
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB for original file

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type: ${file.type}. Only JPEG, PNG, and WebP are allowed.`
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File is too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum size is 10MB.`
    }
  }

  return { valid: true }
}

/**
 * Get image dimensions without loading the full image
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
      URL.revokeObjectURL(img.src)
    }
    
    img.onerror = () => {
      reject(new Error('Failed to load image'))
      URL.revokeObjectURL(img.src)
    }
    
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Create multiple sizes of an image for responsive display
 */
export const createResponsiveImages = async (
  file: File
): Promise<{
  thumbnail: File
  small: File
  medium: File
  large: File
}> => {
  const [thumbnail, small, medium, large] = await Promise.all([
    compressImage(file, { maxWidth: 150, maxHeight: 150, quality: 0.8, maxSizeKB: 50 }),
    compressImage(file, { maxWidth: 400, maxHeight: 300, quality: 0.8, maxSizeKB: 100 }),
    compressImage(file, { maxWidth: 800, maxHeight: 600, quality: 0.8, maxSizeKB: 200 }),
    compressImage(file, { maxWidth: 1200, maxHeight: 800, quality: 0.9, maxSizeKB: 500 })
  ])

  return {
    thumbnail: thumbnail.file,
    small: small.file,
    medium: medium.file,
    large: large.file
  }
}

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * Generate a preview URL for a file
 */
export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file)
}

/**
 * Clean up preview URL to prevent memory leaks
 */
export const revokePreviewUrl = (url: string): void => {
  URL.revokeObjectURL(url)
}