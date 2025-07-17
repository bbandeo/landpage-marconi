"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Building2,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Star,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"

interface Property {
  id: number
  title: string
  description: string
  price: number
  type: "sale" | "rent"
  propertyType: "house" | "apartment" | "commercial" | "land"
  address: string
  neighborhood: string
  city: string
  bedrooms: number
  bathrooms: number
  area: number
  parking: number
  images: string[]
  status: "active" | "inactive" | "sold" | "rented"
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all")

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties")
      if (response.ok) {
        const data = await response.json()
        setProperties(data)
      } else {
        // Mock data for development
        setProperties([
          {
            id: 1,
            title: "Hermoso departamento en Palermo",
            description: "Moderno departamento con excelente ubicación",
            price: 250000,
            type: "sale",
            propertyType: "apartment",
            address: "Av. Santa Fe 1234",
            neighborhood: "Palermo",
            city: "Buenos Aires",
            bedrooms: 2,
            bathrooms: 2,
            area: 85,
            parking: 1,
            images: ["/placeholder.jpg"],
            status: "active",
            featured: true,
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-20T14:30:00Z",
          },
          {
            id: 2,
            title: "Casa familiar en Belgrano",
            description: "Amplia casa con jardín y garage",
            price: 180000,
            type: "rent",
            propertyType: "house",
            address: "Calle Falsa 456",
            neighborhood: "Belgrano",
            city: "Buenos Aires",
            bedrooms: 3,
            bathrooms: 2,
            area: 120,
            parking: 2,
            images: ["/placeholder.jpg"],
            status: "active",
            featured: false,
            createdAt: "2024-01-10T09:00:00Z",
            updatedAt: "2024-01-18T16:45:00Z",
          },
          {
            id: 3,
            title: "Local comercial en Microcentro",
            description: "Excelente ubicación para negocio",
            price: 120000,
            type: "rent",
            propertyType: "commercial",
            address: "Florida 789",
            neighborhood: "Microcentro",
            city: "Buenos Aires",
            bedrooms: 0,
            bathrooms: 1,
            area: 60,
            parking: 0,
            images: ["/placeholder.jpg"],
            status: "rented",
            featured: false,
            createdAt: "2024-01-05T11:00:00Z",
            updatedAt: "2024-01-25T12:00:00Z",
          },
        ])
      }
    } catch (error) {
      console.error("Error fetching properties:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las propiedades.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProperty = async (id: number) => {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id))
        toast({
          title: "Propiedad eliminada",
          description: "La propiedad se eliminó correctamente.",
        })
      } else {
        throw new Error("Failed to delete property")
      }
    } catch (error) {
      console.error("Error deleting property:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar la propiedad.",
        variant: "destructive",
      })
    }
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || property.type === typeFilter
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    const matchesPropertyType = propertyTypeFilter === "all" || property.propertyType === propertyTypeFilter

    return matchesSearch && matchesType && matchesStatus && matchesPropertyType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      case "rented":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Activa"
      case "inactive":
        return "Inactiva"
      case "sold":
        return "Vendida"
      case "rented":
        return "Alquilada"
      default:
        return status
    }
  }

  const getTypeLabel = (type: string) => {
    return type === "sale" ? "Venta" : "Alquiler"
  }

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case "apartment":
        return "Departamento"
      case "house":
        return "Casa"
      case "commercial":
        return "Comercial"
      case "land":
        return "Terreno"
      default:
        return type
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Propiedades</h1>
          <p className="text-gray-600">Gestiona tu portafolio de propiedades</p>
        </div>
        <Button asChild>
          <Link href="/admin/properties/new">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Propiedad
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{properties.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Activas</p>
                <p className="text-2xl font-bold text-green-600">
                  {properties.filter((p) => p.status === "active").length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendidas/Alquiladas</p>
                <p className="text-2xl font-bold text-blue-600">
                  {properties.filter((p) => p.status === "sold" || p.status === "rented").length}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Destacadas</p>
                <p className="text-2xl font-bold text-yellow-600">{properties.filter((p) => p.featured).length}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar propiedades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de operación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las operaciones</SelectItem>
                <SelectItem value="sale">Venta</SelectItem>
                <SelectItem value="rent">Alquiler</SelectItem>
              </SelectContent>
            </Select>

            <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de propiedad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="apartment">Departamento</SelectItem>
                <SelectItem value="house">Casa</SelectItem>
                <SelectItem value="commercial">Comercial</SelectItem>
                <SelectItem value="land">Terreno</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activa</SelectItem>
                <SelectItem value="inactive">Inactiva</SelectItem>
                <SelectItem value="sold">Vendida</SelectItem>
                <SelectItem value="rented">Alquilada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={property.images[0] || "/placeholder.jpg"}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              {property.featured && (
                <Badge className="absolute top-2 left-2 bg-yellow-500">
                  <Star className="w-3 h-3 mr-1" />
                  Destacada
                </Badge>
              )}
              <Badge className={`absolute top-2 right-2 ${getStatusColor(property.status)}`}>
                {getStatusLabel(property.status)}
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {property.address}, {property.neighborhood}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">${property.price.toLocaleString()}</div>
                  <Badge variant="outline">{getTypeLabel(property.type)}</Badge>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.area}m²
                  </div>
                  {property.parking > 0 && (
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-1" />
                      {property.parking}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-gray-500">{getPropertyTypeLabel(property.propertyType)}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/properties/${property.id}/edit`}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver detalles
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. La propiedad será eliminada permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProperty(property.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron propiedades</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || typeFilter !== "all" || statusFilter !== "all" || propertyTypeFilter !== "all"
              ? "Intenta ajustar los filtros de búsqueda"
              : "Comienza agregando tu primera propiedad"}
          </p>
          <Button asChild>
            <Link href="/admin/properties/new">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Propiedad
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
