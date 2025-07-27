export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    crop?: string
    quality?: string
    format?: string
  } = {},
): string {
  if (!publicId) return "/placeholder.svg"

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName) return "/placeholder.svg"

  const { width = 800, height = 600, crop = "fill", quality = "auto", format = "auto" } = options

  const transformations = [`w_${width}`, `h_${height}`, `c_${crop}`, `q_${quality}`, `f_${format}`].join(",")

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`
}
