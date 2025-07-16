"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Home,
  Users,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Target,
  Clock,
  BarChart3,
} from "lucide-react"
import { useContacts } from "@/hooks/useContacts"
import { useContactMetrics } from "@/hooks/useContactMetrics"

export default function Dashboard() {
  const { contacts, loading } = useContacts()
  const metrics = useContactMetrics(contacts)

  const [properties, setProperties] = useState<any[]>([])
  const [propertiesLoading, setPropertiesLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties")
        if (response.ok) {
          const data = await response.json()
          // Ensure data is an array
          setProperties(Array.isArray(data) ? data : [])
        } else {
          setProperties([])
        }
      } catch (error) {
        console.error("Error fetching properties:", error)
        setProperties([])
      } finally {
        setPropertiesLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading || propertiesLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Propiedades Activas</p>
                <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
                <p className="text-xs text-green-600">{properties.filter((p: any) => p.featured).length} destacadas</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contactos</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalContacts}</p>
                <p className="text-xs text-blue-600">+{metrics.contactsThisWeek} esta semana</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasa de Conversión</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.conversionRate.toFixed(1)}%</p>
                <p className="text-xs text-purple-600">{metrics.convertedContacts} convertidos</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Puntuación Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.averageScore.toFixed(1)}/10</p>
                <p className="text-xs text-orange-600">{metrics.overdueActions} acciones vencidas</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nuevos</p>
                <p className="text-xl font-bold text-blue-600">{metrics.newContacts}</p>
              </div>
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contactados</p>
                <p className="text-xl font-bold text-yellow-600">{metrics.contactedContacts}</p>
              </div>
              <Phone className="w-5 h-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calificados</p>
                <p className="text-xl font-bold text-purple-600">{metrics.qualifiedContacts}</p>
              </div>
              <Mail className="w-5 h-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Convertidos</p>
                <p className="text-xl font-bold text-green-600">{metrics.convertedContacts}</p>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simple Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Actividad Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {metrics.weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{day.date}</span>
                  <div className="flex space-x-4">
                    <span className="text-sm">Contactos: {day.contacts}</span>
                    <span className="text-sm text-green-600">Convertidos: {day.converted}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sources Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Fuentes de Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metrics.sourceStats).map(([source, count]) => (
                <div key={source} className="flex items-center justify-between">
                  <span className="text-sm">{source}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Distribución por Prioridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metrics.priorityStats).map(([priority, count]) => (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        priority === "high" ? "bg-red-500" : priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                      }`}
                    />
                    <span className="capitalize">{priority}</span>
                  </div>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contacts.slice(0, 5).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.property}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        contact.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : contact.status === "contacted"
                            ? "bg-yellow-100 text-yellow-800"
                            : contact.status === "qualified"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                      }
                    >
                      {contact.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(contact.createdAt).toLocaleDateString("es-AR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex-col space-y-2">
              <Users className="w-6 h-6" />
              <span>Ver Todos los Contactos</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent">
              <Home className="w-6 h-6" />
              <span>Gestionar Propiedades</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent">
              <Calendar className="w-6 h-6" />
              <span>Programar Seguimientos</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
