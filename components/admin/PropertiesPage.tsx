"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Home,
  Bed,
  Bath,
  Square,
  Star,
  ChevronDown,
} from "lucide-react"

interface Property {
  id: number
  title: string
  address: string
  neighborhood: string
  price: number
  currency: string
  property_type: string
  operation_type: string
  bedrooms?: number
  bathrooms?: number
  area_m2: number
  status: string
  views: number
  leads: number
  created_at: string
  featured: boolean
  images?: string[]
}

const PropertiesPage = () => {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/properties?page=${currentPage}&limit=10`)
        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }
        const data = await response.json()
        setProperties(data.properties || [])
        setTotalPages(data.totalPages || 1)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setProperties([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [currentPage])

  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedOperation, setSelectedOperation] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Filtrar propiedades
  useEffect(() => {
    let filtered = properties

    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((property) => property.property_type === selectedType)
    }

    if (selectedOperation !== "all") {
      filtered = filtered.filter((property) => property.operation_type === selectedOperation)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((property) => property.status === selectedStatus)
    }

    setFilteredProperties(filtered)
  }, [searchTerm, selectedType, selectedOperation, selectedStatus, properties])

  const formatCurrency = (amount: number, currency: string) => {
    return `$${amount.toLocaleString()} ${currency}`
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Disponible"
      case "sold":
        return "Vendido"
      case "rented":
        return "Alquilado"
      case "reserved":
        return "Reservado"
      default:
        return status
    }
  }

  const handleDeleteProperty = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta propiedad?")) {
      try {
        const response = await fetch(`/api/properties/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setProperties(properties.filter((property) => property.id !== id))
        } else {
          alert("Error al eliminar la propiedad")
        }
      } catch (error) {
        console.error("Error deleting property:", error)
        alert("Error al eliminar la propiedad")
      }
    }
  }

  const toggleFeatured = async (id: number) => {
    try {
      const property = properties.find((p) => p.id === id)
      if (!property) return

      const response = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          featured: !property.featured,
        }),
      })

      if (response.ok) {
        const { property: updatedProperty } = await response.json()
        setProperties(properties.map((p) => (p.id === id ? { ...p, featured: updatedProperty.featured } : p)))
      } else {
        alert("Error al actualizar la propiedad")
      }
    } catch (error) {
      console.error("Error toggling featured:", error)
      alert("Error al actualizar la propiedad")
    }
  }

  const PropertyImage = ({ property }: { property: Property }) => {
    const hasImages = property.images && property.images.length > 0

    if (hasImages) {
      return (
        <img
          src={property.images![0] || "/placeholder.svg"}
          alt={property.title}
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          onError={(e) => {
            // Fallback to icon if image fails to load
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            target.nextElementSibling?.classList.remove("hidden")
          }}
        />
      )
    }

    return (
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Home className="w-6 h-6 text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Propiedades</h1>
          <p className="text-gray-600">Administra todas tus propiedades en venta y alquiler</p>
        </div>
        <button
          onClick={() => router.push("/admin/properties/new")}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Propiedad
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar propiedades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>
              Mostrando {filteredProperties.length} de {properties.length} propiedades
            </span>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  disabled={isLoading}
                >
                  <option value="all">Todos</option>
                  <option value="house">Casa</option>
                  <option value="apartment">Departamento</option>
                  <option value="land">Terreno</option>
                  <option value="commercial">Local</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Operación</label>
                <select
                  value={selectedOperation}
                  onChange={(e) => setSelectedOperation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  disabled={isLoading}
                >
                  <option value="all">Todas</option>
                  <option value="sale">Venta</option>
                  <option value="rent">Alquiler</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  disabled={isLoading}
                >
                  <option value="all">Todos</option>
                  <option value="available">Disponible</option>
                  <option value="sold">Vendido</option>
                  <option value="rented">Alquilado</option>
                  <option value="reserved">Reservado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Acciones</label>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedType("all")
                    setSelectedOperation("all")
                    setSelectedStatus("all")
                  }}
                  className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Propiedad</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Tipo</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Precio</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Estado</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Estadísticas</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                      <p className="text-gray-500">Cargando propiedades...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron propiedades</p>
                    <p className="text-sm text-gray-400">Intenta ajustar los filtros o crear una nueva propiedad</p>
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <PropertyImage property={property} />
                          {/* Fallback icon (hidden by default, shown if image fails) */}
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 hidden">
                            <Home className="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">{property.title}</h3>
                          <p className="text-sm text-gray-500 truncate">
                            {property.address}, {property.neighborhood}
                          </p>
                          {property.featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 mt-1">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Destacada
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">
                        {property.property_type === "house"
                          ? "Casa"
                          : property.property_type === "apartment"
                            ? "Departamento"
                            : property.property_type === "land"
                              ? "Terreno"
                              : property.property_type === "commercial"
                                ? "Local"
                                : property.property_type}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {property.operation_type === "sale"
                          ? "Venta"
                          : property.operation_type === "rent"
                            ? "Alquiler"
                            : property.operation_type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-900">
                        {formatCurrency(property.price, property.currency)}
                      </span>
                      {property.bedrooms && (
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span className="flex items-center">
                            <Bed className="w-3 h-3 mr-1" />
                            {property.bedrooms}
                          </span>
                          <span className="flex items-center">
                            <Bath className="w-3 h-3 mr-1" />
                            {property.bathrooms}
                          </span>
                          <span className="flex items-center">
                            <Square className="w-3 h-3 mr-1" />
                            {property.area_m2}m²
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}
                      >
                        {getStatusLabel(property.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {property.views || 0}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {property.leads || 0}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/admin/properties/${property.id}/edit`)}
                          className="p-1 text-gray-400 hover:text-orange-500 transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleFeatured(property.id)}
                          className={`p-1 transition-colors ${property.featured ? "text-orange-500 hover:text-orange-600" : "text-gray-400 hover:text-orange-500"}`}
                          title={property.featured ? "Quitar de destacadas" : "Marcar como destacada"}
                        >
                          <Star className={`w-4 h-4 ${property.featured ? "fill-current" : ""}`} />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Más opciones"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Página <span className="font-medium">{currentPage}</span> de{" "}
              <span className="font-medium">{totalPages}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || isLoading}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertiesPage
