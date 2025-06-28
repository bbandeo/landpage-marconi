'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  ChevronDown
} from 'lucide-react'

interface Property {
  id: number
  title: string
  address: string
  neighborhood: string
  price: number
  currency: string
  type: string
  operation: string
  bedrooms?: number
  bathrooms?: number
  area: number
  status: string
  views: number
  leads: number
  createdAt: string
  featured: boolean
  images?: string[]
}

const PropertiesPage = () => {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Casa familiar en Barrio Parque",
      address: "Belgrano 1234",
      neighborhood: "Barrio Parque",
      price: 75000,
      currency: "USD",
      type: "Casa",
      operation: "Venta",
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      status: "Disponible",
      views: 127,
      leads: 8,
      createdAt: "2024-06-15",
      featured: true
    },
    {
      id: 2,
      title: "Terreno céntrico 10x18",
      address: "San Martín 567",
      neighborhood: "Centro",
      price: 48000,
      currency: "USD",
      type: "Terreno",
      operation: "Venta",
      area: 180,
      status: "Disponible",
      views: 89,
      leads: 12,
      createdAt: "2024-06-10",
      featured: true
    },
    {
      id: 3,
      title: "Departamento luminoso",
      address: "Moreno 890",
      neighborhood: "Barrio Lorenzón",
      price: 200000,
      currency: "ARS",
      type: "Departamento",
      operation: "Alquiler",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      status: "Alquilado",
      views: 45,
      leads: 5,
      createdAt: "2024-06-01",
      featured: false
    },
    {
      id: 4,
      title: "Casa quinta con pileta",
      address: "Ruta Provincial 1 Km 5",
      neighborhood: "Zona Rural",
      price: 120000,
      currency: "USD",
      type: "Casa",
      operation: "Venta",
      bedrooms: 4,
      bathrooms: 3,
      area: 300,
      status: "Vendido",
      views: 203,
      leads: 15,
      createdAt: "2024-05-28",
      featured: true
    }
  ])
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedOperation, setSelectedOperation] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filtrar propiedades
  useEffect(() => {
    let filtered = properties

    if (searchTerm) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(property => property.type === selectedType)
    }

    if (selectedOperation !== 'all') {
      filtered = filtered.filter(property => property.operation === selectedOperation)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(property => property.status === selectedStatus)
    }

    setFilteredProperties(filtered)
  }, [searchTerm, selectedType, selectedOperation, selectedStatus, properties])

  const formatCurrency = (amount: number, currency: string) => {
    return `$${amount.toLocaleString()} ${currency}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-800'
      case 'Vendido':
        return 'bg-red-100 text-red-800'
      case 'Alquilado':
        return 'bg-blue-100 text-blue-800'
      case 'Reservado':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDeleteProperty = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      setProperties(properties.filter(property => property.id !== id))
    }
  }

  const toggleFeatured = (id: number) => {
    setProperties(properties.map(property => 
      property.id === id 
        ? { ...property, featured: !property.featured }
        : property
    ))
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
          onClick={() => router.push('/admin/properties/new')}
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
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Mostrando {filteredProperties.length} de {properties.length} propiedades</span>
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
                >
                  <option value="all">Todos</option>
                  <option value="Casa">Casa</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Local">Local</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Operación</label>
                <select 
                  value={selectedOperation}
                  onChange={(e) => setSelectedOperation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">Todas</option>
                  <option value="Venta">Venta</option>
                  <option value="Alquiler">Alquiler</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">Todos</option>
                  <option value="Disponible">Disponible</option>
                  <option value="Vendido">Vendido</option>
                  <option value="Alquilado">Alquilado</option>
                  <option value="Reservado">Reservado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Acciones</label>
                <button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedType('all')
                    setSelectedOperation('all')
                    setSelectedStatus('all')
                  }}
                  className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
              {filteredProperties.length === 0 ? (
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
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Home className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">{property.title}</h3>
                          <p className="text-sm text-gray-500 truncate">{property.address}, {property.neighborhood}</p>
                          {property.featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 mt-1">
                              <Star className="w-3 h-3 mr-1" />
                              Destacada
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">{property.type}</span>
                      <span className="block text-xs text-gray-500">{property.operation}</span>
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
                            {property.area}m²
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {property.views}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {property.leads}
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
                          className={`p-1 transition-colors ${property.featured ? 'text-orange-500 hover:text-orange-600' : 'text-gray-400 hover:text-orange-500'}`}
                          title={property.featured ? "Quitar de destacadas" : "Marcar como destacada"}
                        >
                          <Star className="w-4 h-4" />
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
      {filteredProperties.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredProperties.length}</span> de{' '}
              <span className="font-medium">{properties.length}</span> resultados
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors" disabled>
                Anterior
              </button>
              <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors" disabled>
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