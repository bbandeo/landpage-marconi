"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Bed, Bath, Square, Eye, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { getOptimizedImageUrl } from "@/lib/cloudinary"
import Link from "next/link"

interface Property {
  id: string
  title: string
  description: string
  price: number
  currency: string
  operation_type: "sale" | "rent"
  property_type: string
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  neighborhood: string
  featured: boolean
  status: "available" | "sold" | "rented"
  images: string[]
  views: number
  created_at: string
}

const ITEMS_PER_PAGE = 12

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [operationType, setOperationType] = useState<string>("all")
  const [propertyType, setPropertyType] = useState<string>("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [bedrooms, setBedrooms] = useState<string>("all")
  const [bathrooms, setBathrooms] = useState<string>("all")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    fetchProperties()
  }, [])

  useEffect(() => {
    filterProperties()
  }, [properties, searchTerm, operationType, propertyType, minPrice, maxPrice, bedrooms, bathrooms, sortBy])

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties")
      if (response.ok) {
        const data = await response.json()
        setProperties(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterProperties = () => {
    let filtered = [...properties]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Operation type filter
    if (operationType !== "all") {
      filtered = filtered.filter((property) => property.operation_type === operationType)
    }

    // Property type filter
    if (propertyType !== "all") {
      filtered = filtered.filter((property) => property.property_type === propertyType)
    }

    // Price filters
    if (minPrice) {
      filtered = filtered.filter((property) => property.price >= Number.parseInt(minPrice))
    }
    if (maxPrice) {
      filtered = filtered.filter((property) => property.price <= Number.parseInt(maxPrice))
    }

    // Bedrooms filter
    if (bedrooms !== "all") {
      filtered = filtered.filter((property) => property.bedrooms >= Number.parseInt(bedrooms))
    }

    // Bathrooms filter
    if (bathrooms !== "all") {
      filtered = filtered.filter((property) => property.bathrooms >= Number.parseInt(bathrooms))
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "views":
          return b.views - a.views
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    setFilteredProperties(filtered)
    setCurrentPage(1)
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

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId)
    } else {
      newFavorites.add(propertyId)
    }
    setFavorites(newFavorites)
  }

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency === "USD" ? "USD" : "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status: string, featured: boolean) => {
    if (featured) {
      return <Badge className="bg-brand-orange text-white">Destacada</Badge>
    }

    switch (status) {
      case "available":
        return <Badge className="bg-green-500 text-white">Disponible</Badge>
      case "sold":
        return <Badge className="bg-red-500 text-white">Vendida</Badge>
      case "rented":
        return <Badge className="bg-blue-500 text-white">Alquilada</Badge>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-800 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-96 mx-auto animate-pulse" />
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-700" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-700 rounded w-1/2" />
                  <div className="h-6 bg-gray-700 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Propiedades en Reconquista</h1>
          <p className="text-lg text-gray-300">Encuentra tu próximo hogar o inversión</p>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-brand-orange mr-2" />
              <h2 className="text-lg font-semibold text-white">Filtros de búsqueda</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Input
                placeholder="Buscar por título, dirección o barrio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-brand-orange focus:ring-brand-orange"
              />

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

              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-brand-orange focus:ring-brand-orange">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all" className="text-white hover:bg-gray-600">
                    Todos
                  </SelectItem>
                  <SelectItem value="casa" className="text-white hover:bg-gray-600">
                    Casa
                  </SelectItem>
                  <SelectItem value="departamento" className="text-white hover:bg-gray-600">
                    Departamento
                  </SelectItem>
                  <SelectItem value="terreno" className="text-white hover:bg-gray-600">
                    Terreno
                  </SelectItem>
                  <SelectItem value="local" className="text-white hover:bg-gray-600">
                    Local
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-brand-orange focus:ring-brand-orange">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="newest" className="text-white hover:bg-gray-600">
                    Más recientes
                  </SelectItem>
                  <SelectItem value="price-low" className="text-white hover:bg-gray-600">
                    Precio menor
                  </SelectItem>
                  <SelectItem value="price-high" className="text-white hover:bg-gray-600">
                    Precio mayor
                  </SelectItem>
                  <SelectItem value="views" className="text-white hover:bg-gray-600">
                    Más vistas
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                placeholder="Precio mín."
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-brand-orange focus:ring-brand-orange"
              />

              <Input
                placeholder="Precio máx."
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-brand-orange focus:ring-brand-orange"
              />

              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-brand-orange focus:ring-brand-orange">
                  <SelectValue placeholder="Dormitorios" />
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
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-400">{filteredProperties.length} propiedades encontradas</p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Limpiar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        {currentProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No se encontraron propiedades</p>
            <Button onClick={clearFilters} className="bg-brand-orange hover:bg-brand-orange/90">
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentProperties.map((property) => (
                <Card
                  key={property.id}
                  className="bg-gray-800 border-gray-700 overflow-hidden hover:border-brand-orange transition-colors group"
                >
                  <div className="relative">
                    <img
                      src={
                        property.images?.[0]
                          ? getOptimizedImageUrl(property.images[0], { width: 400, height: 250, crop: "fill" })
                          : "/placeholder.svg?height=250&width=400"
                      }
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {getStatusBadge(property.status, property.featured)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-3 right-3 p-2 rounded-full ${
                        favorites.has(property.id)
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-black/50 text-white hover:bg-black/70"
                      }`}
                      onClick={() => toggleFavorite(property.id)}
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(property.id) ? "fill-current" : ""}`} />
                    </Button>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {formatPrice(property.price, property.currency)}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-1">{property.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="line-clamp-1">
                        {property.address}, {property.neighborhood}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {property.property_type}
                      </Badge>
                      <div className="flex items-center space-x-3 text-gray-400 text-sm">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span>{property.bedrooms}</span>
                          </div>
                        )}
                        {property.bathrooms > 0 && (
                          <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span>{property.bathrooms}</span>
                          </div>
                        )}
                        {property.area > 0 && (
                          <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            <span>{property.area}m²</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>{property.views} vistas</span>
                      </div>
                      <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90" asChild>
                        <Link href={`/propiedades/${property.id}`}>Ver detalles</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Anterior
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-brand-orange hover:bg-brand-orange/90"
                            : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
