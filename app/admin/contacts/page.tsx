'use client'

import { useState } from 'react'
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar,
  Filter,
  Search,
  Eye,
  MoreHorizontal
} from 'lucide-react'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  message: string
  property: string
  status: 'new' | 'contacted' | 'qualified' | 'converted'
  source: string
  createdAt: string
}

export default function ContactsPage() {
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "María González",
      email: "maria.gonzalez@email.com",
      phone: "+54 9 3482 123456",
      message: "Hola, me interesa la casa en Barrio Parque. ¿Podríamos coordinar una visita?",
      property: "Casa familiar en Barrio Parque",
      status: "new",
      source: "Website",
      createdAt: "2024-06-28 14:30"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos.r@email.com",
      phone: "+54 9 3482 987654",
      message: "Consulta sobre el terreno céntrico. ¿Está disponible el financiamiento?",
      property: "Terreno céntrico 10x18",
      status: "contacted",
      source: "WhatsApp",
      createdAt: "2024-06-27 10:15"
    },
    {
      id: 3,
      name: "Ana Martín",
      email: "ana.martin@email.com",
      phone: "+54 9 3482 456789",
      message: "Busco departamento para alquilar. El que vi en la página me gustó mucho.",
      property: "Departamento luminoso",
      status: "qualified",
      source: "Instagram",
      createdAt: "2024-06-26 16:45"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'qualified':
        return 'bg-purple-100 text-purple-800'
      case 'converted':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'Nuevo'
      case 'contacted':
        return 'Contactado'
      case 'qualified':
        return 'Calificado'
      case 'converted':
        return 'Convertido'
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contactos y Leads</h1>
        <p className="text-gray-600">Gestiona todas las consultas y potenciales clientes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Contactos Nuevos", value: "12", color: "bg-blue-500" },
          { label: "En Seguimiento", value: "8", color: "bg-yellow-500" },
          { label: "Calificados", value: "5", color: "bg-purple-500" },
          { label: "Convertidos", value: "3", color: "bg-green-500" }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar contactos..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Contacto</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Propiedad</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Estado</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Fuente</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Fecha</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-medium text-gray-900">{contact.name}</h3>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {contact.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {contact.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-gray-900">{contact.property}</p>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs truncate">{contact.message}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                      {getStatusLabel(contact.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-900">{contact.source}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-500">{contact.createdAt}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-orange-500">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
