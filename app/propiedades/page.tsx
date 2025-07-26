"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getOptimizedImageUrl } from "@/lib/cloudinary"
import Link from "next/link"
import Image from "next/image"

interface Property {
  id: string
  title: string
  description: string
  price: number
  operation_type: "sale" | "rent"
  property_type: "house" | "apartment" | "commercial" | "land"
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  neighborhood: string
  images: string[]
  status: "available" | "sold" | "rented"
  featured: boolean
  views: number
  created_at: string
}

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Casa moderna en centro",
    description: "Hermosa casa con todas las comodidades",
    price: 85000,
    operation_type: "sale",
    property_type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    address: "San Martín 1234",
    neighborhood: "Centro",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    status: "available",
    featured: true,
    views: 245,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    title: "Departamento luminoso",
    description: "Departamento de 2 ambientes con balcón",
    price: 45000,
    operation_type: "rent",
    property_type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    address: "Rivadavia 567",
    neighborhood: "Norte",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    status: "available",
    featured: false,
    views: 128,
    created_at: "2024-01-10",
  },
  {
    id: "3",
    title: "Local comercial estratégico",
    description: "Excelente ubicación para comercio",
    price: 120000,
    operation_type: "sale",
    property_type: "commercial",
    bedrooms: 0,
    bathrooms: 1,
    area: 80,
    address: "Belgrano 890",
    neighborhood: "Centro",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    status: "available",
    featured: true,
    views: 89,
    created_at: "2024-01-08",
  },
  {
    id: "4",
    title: "Terreno para construcción",
    description: "Lote ideal para proyecto habitacional",
    price: 35000,
    operation_type: "sale",
    property_type: "land",
    bedrooms: 0,
    bathrooms: 0,
    area: 300,
    address: "Las Flores 456",
    neighborhood: "Sur",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    status: "available",
    featured: false,
    views: 67,
    created_at: "2024-01-05",
  },
  {
    id: "5",
    title: "Casa familiar amplia",
    description: "Casa de 4 dormitorios con patio",
    price: 95000,
    operation_type: "sale",
    property_type: "house",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    address: "Moreno 789",
    neighborhood: "Oeste",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    status: "available",
    featured: true,
    views: 312,
    created_at: "2024-01-12",
  },
  {
    id: "6",
    title: "Departamento en alquiler",
    description: "Monoambiente ideal para estudiantes",
    price: 25000,
    operation_type: "rent",
    property_type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    address: "Sarmiento 321",
    neighborhood: "Centro",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    status: "rented",
    featured: false,
    views: 156,
    created_at: "2024-01-03",
  },
]

const ITEMS_PER_PAGE = 12

export default function PropiedadesPage() {
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<string[]>([])

  // Filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [operationType, setOperationType] = useState<string>("all")
  const [propertyType, setPropertyType] = useState<string>("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [bedrooms, setBedrooms] = useState<string>("all")
  const [bathrooms, setBathrooms] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...properties]

    // Búsqueda por texto
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por tipo de operación
    if (operationType !== "all") {
      filtered = filtered.filter((property) => property.operation_type === operationType)
    }

    // Filtro por tipo de propiedad
    if (propertyType !== "all") {
      filtered = filtered.filter((property) => property.property_type === propertyType)
    }

    // Filtro por precio
    if (minPrice) {
      filtered = filtered.filter((property) => property.price >= Number.parseInt(minPrice))
    }
    if (maxPrice) {
      filtered = filtered.filter((property) => property.price <= Number.parseInt(maxPrice))
    }

    // Filtro por dormitorios
    if (bedrooms !== "all") {
      filtered = filtered.filter((property) => property.bedrooms >= Number.parseInt(bedrooms))
    }

    // Filtro por baños
    if (bathrooms !== "all") {
      filtered = filtered.filter((property) => property.bathrooms >= Number.parseInt(bathrooms))
    }

    // Ordenamiento
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "views":
        filtered.sort((a, b) => b.views - a.views)
        break
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    setFilteredProperties(filtered)
    setCurrentPage(1)
  }, [properties, searchTerm, operationType, propertyType, minPrice, maxPrice, bedrooms, bathrooms, sortBy])

  // Paginación
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setOperationType("all")
    setPropertyType("all")
    setMinPrice("")
    setMaxPrice("")
    setBedrooms("all")
    setBathrooms("all")
    setSortBy("newest")
  }

  const formatPrice = (price: number, operation: string) => {
    return (
      new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price) + (operation === "rent" ? "/mes" : "")
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-600 hover:bg-green-700 text-white">Disponible</Badge>
      case "sold":
        return <Badge className="bg-red-600 hover:bg-red-700 text-white">Vendida</Badge>
      case "rented":
        return <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Alquilada</Badge>
      default:
        return null
    }
  }

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case "house":
        return "Casa"
      case "apartment":
        return "Departamento"
      case "commercial":
        return "Comercial"
      case "land":
        return "Terreno"
      default:
        return type
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Propiedades en Reconquista</h1>
            <p className="text-gray-300 text-lg">Encuentra tu próximo hogar o inversión</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-brand-orange" />
            <h2 className="text-lg font-semibold text-white">Filtros de búsqueda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Búsqueda */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título, dirección o barrio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-orange focus:ring-brand-orange"
                />
              </div>
            </div>

            {/* Tipo de operación */}
            <Select value={operationType} onValueChange={setOperationType}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-brand-orange focus:ring-brand-orange">
                <SelectValue placeholder="Operación" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-600">
                  Todas
                </SelectItem>
                <SelectItem value="sale" className="text-white hover:bg-gray-600">
                  Venta
                </SelectItem>
                <SelectItem value="rent" className="text-white hover:bg-gray-600">
                  Alquiler
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Tipo de propiedad */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-brand-orange focus:ring-brand-orange">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-600">
                  Todos
                </SelectItem>
                <SelectItem value="house" className="text-white hover:bg-gray-600">
                  Casa
                </SelectItem>
                <SelectItem value="apartment" className="text-white hover:bg-gray-600">
                  Departamento
                </SelectItem>
                <SelectItem value="commercial" className="text-white hover:bg-gray-600">
                  Comercial
                </SelectItem>
                <SelectItem value="land" className="text-white hover:bg-gray-600">
                  Terreno
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Precio mínimo */}
            <Input
              placeholder="Precio mín."
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-orange focus:ring-brand-orange"
            />

            {/* Precio máximo */}
            <Input
              placeholder="Precio máx."
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-orange focus:ring-brand-orange"
            />

            {/* Dormitorios */}
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-brand-orange focus:ring-brand-orange">
                <SelectValue placeholder="Dorm." />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-600">
                  Todos
                </SelectItem>
                <SelectItem value="1" className="text-white hover:bg-gray-600">
                  1+
                </SelectItem>
                <SelectItem value="2" className="text-white hover:bg-gray-600">
                  2+
                </SelectItem>
                <SelectItem value="3" className="text-white hover:bg-gray-600">
                  3+
                </SelectItem>
                <SelectItem value="4" className="text-white hover:bg-gray-600">
                  4+
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Baños */}
            <Select value={bathrooms} onValueChange={setBathrooms}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-brand-orange focus:ring-brand-orange">
                <SelectValue placeholder="Baños" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-600">
                  Todos
                </SelectItem>
                <SelectItem value="1" className="text-white hover:bg-gray-600">
                  1+
                </SelectItem>
                <SelectItem value="2" className="text-white hover:bg-gray-600">
                  2+
                </SelectItem>
                <SelectItem value="3" className="text-white hover:bg-gray-600">
                  3+
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Ordenar por */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-brand-orange focus:ring-brand-orange">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="newest" className="text-white hover:bg-gray-600">
                  Más recientes
                </SelectItem>
                <SelectItem value="price-asc" className="text-white hover:bg-gray-600">
                  Precio menor
                </SelectItem>
                <SelectItem value="price-desc" className="text-white hover:bg-gray-600">
                  Precio mayor
                </SelectItem>
                <SelectItem value="views" className="text-white hover:bg-gray-600">
                  Más vistas
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Limpiar filtros */}
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
            >
              Limpiar
            </Button>
          </div>
        </motion.div>

        {/* Resultados */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-300">{filteredProperties.length} propiedades encontradas</p>
        </div>

        {/* Grid de propiedades */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <div className="h-48 bg-gray-700 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : currentProperties.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron propiedades</h3>
              <p>Intenta ajustar los filtros de búsqueda</p>
            </div>
            <Button onClick={clearFilters} className="bg-brand-orange hover:bg-orange-600">
              Limpiar filtros
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-brand-orange transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={getOptimizedImageUrl(property.images[0], {
                          width: 400,
                          height: 250,
                          crop: "fill",
                          quality: "auto",
                          format: "auto" || "/placeholder.svg",
                        })}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {property.featured && (
                        <Badge className="bg-brand-orange hover:bg-orange-600 text-white">Destacada</Badge>
                      )}
                      {getStatusBadge(property.status)}
                    </div>

                    {/* Favorito */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => toggleFavorite(property.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-white"
                        }`}
                      />
                    </Button>

                    {/* Precio */}
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {formatPrice(property.price, property.operation_type)}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-white text-lg line-clamp-1">{property.title}</h3>
                        <div className="flex items-center text-gray-400 text-sm mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.address}, {property.neighborhood}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span className="bg-gray-700 px-2 py-1 rounded">
                          {getPropertyTypeLabel(property.property_type)}
                        </span>
                        <div className="flex items-center gap-3">
                          {property.bedrooms > 0 && (
                            <div className="flex items-center gap-1">
                              <Bed className="h-3 w-3" />
                              {property.bedrooms}
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div className="flex items-center gap-1">
                              <Bath className="h-3 w-3" />
                              {property.bathrooms}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Square className="h-3 w-3" />
                            {property.area}m²
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                        <div className="flex items-center text-gray-400 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          {property.views} vistas
                        </div>
                        <Link href={`/propiedades/${property.id}`}>
                          <Button size="sm" className="bg-brand-orange hover:bg-orange-600">
                            Ver detalles
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-2 mt-12"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber
                if (totalPages <= 5) {
                  pageNumber = i + 1
                } else if (currentPage <= 3) {
                  pageNumber = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i
                } else {
                  pageNumber = currentPage - 2 + i
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNumber)}
                    className={
                      currentPage === pageNumber
                        ? "bg-brand-orange hover:bg-orange-600"
                        : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    {pageNumber}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
