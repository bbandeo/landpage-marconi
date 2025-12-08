/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Desactivar Turbopack - usar Webpack para compatibilidad con Leaflet
  experimental: {
    turbo: false,
  },
}

export default nextConfig
