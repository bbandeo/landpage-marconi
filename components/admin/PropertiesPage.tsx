"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, Building2 } from "lucide-react"

interface Property {
  id: number
  title: string
  type: string
  operation: string
  price: number
  currency: string
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  neighborhood: string
  status: string
  featured: boolean
  images: string[]
  createdAt: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockProperties: Property[] = [
          {
            id: 1,
            title: "Casa familiar en Barrio Parque",
            type: "Casa",
            operation: "Venta",
            price: 75000,
            currency: "USD",
            bedrooms: 3,
            bathrooms: 2,
            area: 150,
            address: "Belgrano 1234",
            neighborhood: "Barrio Parque",
            status: "Disponible",
            featured: true,
            images: ["/placeholder.jpg"],
            createdAt: "2024-01-15",
          },
          {
            id: 2,
            title: "Departamento moderno en Centro",
            type: "Departamento",
            operation: "Alquiler",
            price: 450,
            currency: "USD",
            bedrooms: 2,
            bathrooms: 1,
            area: 80,
            address: "San Martín 567",
            neighborhood: "Centro",
            status: "Disponible",
            featured: false,
            images: ["/placeholder.jpg"],
            createdAt: "2024-01-10",
          },
          {
            id: 3,
            title: "Casa quinta con pileta",
            type: "Casa",
            operation: "Venta",
            price: 120000,
            currency: "USD",
            bedrooms: 4,
            bathrooms: 3,
            area: 250,
            address: "Ruta 9 Km 15",
            neighborhood: "Zona Rural",
            status: "Vendido",
            featured: true,
            images: ["/placeholder.jpg"],
            createdAt: "2024-01-05",
          },
        ]

        setProperties(mockProperties)
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || property.type === filterType
    const matchesStatus = filterStatus === "all" || property.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta propiedad?")) {
      setProperties(properties.filter((p) => p.id !== id))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Propiedades</h1>
          <p className="text-gray-600">Gestiona tu catálogo de propiedades</p>
        </div>
        <Link href="/admin/properties/new">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Propiedad
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar propiedades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de propiedad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="Casa">Casa</SelectItem>
                <SelectItem value="Departamento">Departamento</SelectItem>
                <SelectItem value="Local">Local</SelectItem>
                <SelectItem value="Terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Disponible">Disponible</SelectItem>
                <SelectItem value="Reservado">Reservado</SelectItem>
                <SelectItem value="Vendido">Vendido</SelectItem>
                <SelectItem value="Alquilado">Alquilado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-200 relative">
              <img
                src={property.images[0] || "/placeholder.jpg"}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.featured && <Badge className="absolute top-2 left-2 bg-orange-600">Destacada</Badge>}
              <Badge
                className={`absolute top-2 right-2 ${
                  property.status === "Disponible"
                    ? "bg-green-600"
                    : property.status === "Reservado"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                }`}
              >
                {property.status}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{property.title}</CardTitle>
              <CardDescription>
                {property.address}, {property.neighborhood}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {property.type} - {property.operation}
                  </span>
                  <span className="font-bold text-orange-600">
                    {property.currency} {property.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{property.bedrooms} dorm.</span>
                  <span>{property.bathrooms} baños</span>
                  <span>{property.area} m²</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Link href={`/admin/properties/${property.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(property.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron propiedades</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== "all" || filterStatus !== "all"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Comienza agregando tu primera propiedad"}
            </p>
            <Link href="/admin/properties/new">
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Propiedad
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
