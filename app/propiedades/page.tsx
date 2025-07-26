"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PropertyService, type PropertySearchParams } from "@/services/properties"
import { getOptimizedImageUrl } from "@/lib/cloudinary"
import type { Property } from "@/lib/supabase"

interface PropertyWithStats extends Property {
  views?: number
  leads?: number
}

interface PropertyCardProps {
  property: PropertyWithStats
}

function PropertyCard({ property }: PropertyCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const firstImage = property.images && property.images.length > 0 ? property.images[0] : null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
      case "Disponible":
        return "bg-green-100 text-green-800"
      case "sold":
      case "Vendido":
        return "bg-red-100 text-red-800"
      case "rented":
      case "Alquilado":
        return "bg-blue-100 text-blue-800"
      case "reserved":
      case "Reservado":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOperationTypeLabel = (type: string) => {
    return type === "venta" ? "Venta" : "Alquiler"
  }

  const getPropertyTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      casa: "Casa",
      departamento: "Departamento",
      terreno: "Terreno",
      local: "Local",
    }
    return typeMap[type] || type
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          {!imageError && firstImage ? (
            <img
              src={getOptimizedImageUrl(firstImage, {
                width: 400,
                height: 300,
                crop: "fill",
                quality: "auto" || "/placeholder.svg",
              })}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Sin imagen</p>
              </div>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={getStatusColor(property.status)}>
            {property.status === "available" ? "Disponible" : property.status}
          </Badge>
          {property.featured && <Badge className="bg-yellow-500 text-white">Destacada</Badge>}
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>

        {/* Views */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Eye className="w-3 h-3" />
          {property.views || 0}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Price and Operation */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</div>
          <Badge variant="outline" className="text-xs">
            {getOperationTypeLabel(property.operation_type)}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{property.address || `${property.neighborhood}, ${property.city}`}</span>
        </div>

        {/* Property details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="font-medium">{getPropertyTypeLabel(property.property_type)}</span>
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.area_m2 && (
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.area_m2}m²</span>
            </div>
          )}
        </div>

        {/* Description */}
        {property.description && <p className="text-sm text-gray-600 line-clamp-2 mb-3">{property.description}</p>}

        {/* Action button */}
        <Button className="w-full bg-orange-600 hover:bg-orange-700">Ver detalles</Button>
      </CardContent>
    </Card>
  )
}

export default function PropiedadesPage() {
  const [properties, setProperties] = useState<PropertyWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [operationType, setOperationType] = useState("all")
  const [propertyType, setPropertyType] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [bedrooms, setBedrooms] = useState("all")
  const [bathrooms, setBathrooms] = useState("all")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("desc")

  const fetchProperties = async (page = 1) => {
    setLoading(true)
    try {
      const params: PropertySearchParams = {
        page,
        limit: 12,
        search: searchTerm || undefined,
        operation_type: operationType !== "all" ? operationType : undefined,
        property_type: propertyType !== "all" ? propertyType : undefined,
        min_price: minPrice ? Number.parseInt(minPrice) : undefined,
        max_price: maxPrice ? Number.parseInt(maxPrice) : undefined,
        bedrooms: bedrooms !== "all" ? Number.parseInt(bedrooms) : undefined,
        bathrooms: bathrooms !== "all" ? Number.parseInt(bathrooms) : undefined,
        sort_by: sortBy as "price" | "created_at" | "views",
        sort_order: sortOrder as "asc" | "desc",
        status: "available", // Solo mostrar propiedades disponibles
      }

      const result = await PropertyService.getProperties(params)
      setProperties(result.properties)
      setTotalPages(result.totalPages)
      setTotal(result.total)
      setCurrentPage(page)
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties(1)
  }, [searchTerm, operationType, propertyType, minPrice, maxPrice, bedrooms, bathrooms, sortBy, sortOrder])

  const handlePageChange = (page: number) => {
    fetchProperties(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setOperationType("all")
    setPropertyType("all")
    setMinPrice("")
    setMaxPrice("")
    setBedrooms("all")
    setBathrooms("all")
    setSortBy("created_at")
    setSortOrder("desc")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Propiedades en Reconquista</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra la propiedad perfecta para ti. Explora nuestra amplia selección de casas, departamentos y
              locales.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-50 rounded-lg p-6">
            {/* Search bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por título, dirección o barrio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
              <Select value={operationType} onValueChange={setOperationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Operación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las operaciones</SelectItem>
                  <SelectItem value="venta">Venta</SelectItem>
                  <SelectItem value="alquiler">Alquiler</SelectItem>
                </SelectContent>
              </Select>

              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Precio mínimo"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <Input
                placeholder="Precio máximo"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />

              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger>
                  <SelectValue placeholder="Dormitorios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Cualquier cantidad</SelectItem>
                  <SelectItem value="1">1 dormitorio</SelectItem>
                  <SelectItem value="2">2 dormitorios</SelectItem>
                  <SelectItem value="3">3 dormitorios</SelectItem>
                  <SelectItem value="4">4+ dormitorios</SelectItem>
                </SelectContent>
              </Select>

              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger>
                  <SelectValue placeholder="Baños" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Cualquier cantidad</SelectItem>
                  <SelectItem value="1">1 baño</SelectItem>
                  <SelectItem value="2">2 baños</SelectItem>
                  <SelectItem value="3">3+ baños</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort and Clear */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Select
                  value={`${sortBy}-${sortOrder}`}
                  onValueChange={(value) => {
                    const [sort, order] = value.split("-")
                    setSortBy(sort)
                    setSortOrder(order)
                  }}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at-desc">Más recientes</SelectItem>
                    <SelectItem value="created_at-asc">Más antiguos</SelectItem>
                    <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                    <SelectItem value="views-desc">Más vistas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{total} propiedades encontradas</span>
                <Button variant="outline" onClick={clearFilters} size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Limpiar filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>

                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                    if (pageNum > totalPages) return null

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10 h-10 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron propiedades</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              No hay propiedades que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros o realizar una
              nueva búsqueda.
            </p>
            <Button onClick={clearFilters} variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Limpiar todos los filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
