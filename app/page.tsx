"use client"
import { AboutUsSection } from "@/components/landing/about-us-section"

interface Property {
  id: string
  title: string
  price: number
  operation_type: "sale" | "rent"
  property_type: "house" | "apartment" | "commercial" | "land"
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  neighborhood: string
  images: string[]
  featured: boolean
}

const featuredProperties: Property[] = [
  {
    id: "1",
    title: "Casa moderna en centro",
    price: 85000,
    operation_type: "sale",
    property_type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    address: "San Martín 1234",
    neighborhood: "Centro",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    featured: true,
  },
  {
    id: "2",
    title: "Departamento luminoso",
    price: 45000,
    operation_type: "rent",
    property_type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    address: "Rivadavia 567",
    neighborhood: "Norte",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    featured: true,
  },
  {
    id: "3",
    title: "Local comercial estratégico",
    price: 120000,
    operation_type: "sale",
    property_type: "commercial",
    bedrooms: 0,
    bathrooms: 1,
    area: 80,
    address: "Belgrano 890",
    neighborhood: "Centro",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    featured: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <AboutUsSection />
      </main>
    </div>
  )
}