export interface Property {
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
