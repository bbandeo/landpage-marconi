"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Home,
  MessageSquare,
  DollarSign,
  Users,
  Eye,
  Plus,
  ArrowUpRight,
  Calendar,
  MapPin,
} from "lucide-react"

interface DashboardStats {
  totalProperties: number
  activeListings: number
  totalLeads: number
  monthlyRevenue: number
  viewsThisMonth: number
  conversionRate: number
}

interface RecentActivity {
  id: string
  type: "lead" | "property" | "view"
  title: string
  description: string
  timestamp: string
  status?: "new" | "contacted" | "sold"
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 23,
    activeListings: 18,
    totalLeads: 47,
    monthlyRevenue: 145000,
    viewsThisMonth: 1247,
    conversionRate: 12.5,
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "lead",
      title: "Nueva consulta",
      description: "María González preguntó sobre la casa en Barrio Parque",
      timestamp: "Hace 5 minutos",
      status: "new",
    },
    {
      id: "2",
      type: "property",
      title: "Propiedad actualizada",
      description: "Se actualizó el precio del terreno en Centro",
      timestamp: "Hace 1 hora",
    },
    {
      id: "3",
      type: "view",
      title: "Nueva visualización",
      description: "Departamento en Lorenzón fue visto 15 veces hoy",
      timestamp: "Hace 2 horas",
    },
    {
      id: "4",
      type: "lead",
      title: "Contacto respondido",
      description: "Se respondió la consulta de Juan Pérez",
      timestamp: "Hace 3 horas",
      status: "contacted",
    },
  ])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Try to fetch real data from API
        const statsResponse = await fetch("/api/dashboard/stats")
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          if (statsData.stats) {
            setStats((prevStats) => ({
              totalProperties: statsData.stats.activeProperties?.value || prevStats.totalProperties,
              activeListings: statsData.stats.activeProperties?.value || prevStats.activeListings,
              totalLeads: statsData.stats.newLeads?.value || prevStats.totalLeads,
              monthlyRevenue:
                Number.parseInt(statsData.stats.monthlySales?.value?.replace(/[$,]/g, "") || "0") ||
                prevStats.monthlyRevenue,
              viewsThisMonth:
                Number.parseInt(statsData.stats.totalViews?.value?.replace(/,/g, "") || "0") ||
                prevStats.viewsThisMonth,
              conversionRate: prevStats.conversionRate,
            }))
          }
        }

        // Try to fetch recent activity
        const activityResponse = await fetch("/api/dashboard/recent-activity")
        if (activityResponse.ok) {
          const activityData = await activityResponse.json()
          if (activityData.activities && Array.isArray(activityData.activities)) {
            setRecentActivity(
              activityData.activities.map((activity: any) => ({
                id: activity.id || Math.random().toString(),
                type:
                  activity.type === "property_created"
                    ? "property"
                    : activity.type === "lead_created"
                      ? "lead"
                      : "view",
                title:
                  activity.type === "property_created"
                    ? "Nueva propiedad"
                    : activity.type === "lead_created"
                      ? "Nueva consulta"
                      : "Actividad",
                description: activity.message || "Sin descripción",
                timestamp: activity.timeAgo || activity.timestamp || "Hace un momento",
                status: activity.type === "lead_created" ? "new" : undefined,
              })),
            )
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setError("No se pudieron cargar algunos datos. Mostrando datos de ejemplo.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      title: "Propiedades Totales",
      value: stats.totalProperties || 0,
      icon: Home,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
    },
    {
      title: "Listados Activos",
      value: stats.activeListings || 0,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8%",
    },
    {
      title: "Leads del Mes",
      value: stats.totalLeads || 0,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+23%",
    },
    {
      title: "Ingresos Mensuales",
      value: `$${(stats.monthlyRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+15%",
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">¡Bienvenida, Floriana!</h1>
          <p className="text-gray-600 mt-1">Aquí tienes un resumen de tu inmobiliaria</p>
          {error && <p className="text-amber-600 text-sm mt-1 bg-amber-50 px-2 py-1 rounded">{error}</p>}
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Este mes
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Nueva propiedad
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Actividad Reciente</span>
              <Button variant="ghost" size="sm">
                Ver todo
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "lead"
                          ? "bg-blue-50"
                          : activity.type === "property"
                            ? "bg-green-50"
                            : "bg-purple-50"
                      }`}
                    >
                      {activity.type === "lead" && <Users className="w-4 h-4 text-blue-600" />}
                      {activity.type === "property" && <Home className="w-4 h-4 text-green-600" />}
                      {activity.type === "view" && <Eye className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                    </div>
                    {activity.status && (
                      <Badge
                        variant={
                          activity.status === "new"
                            ? "default"
                            : activity.status === "contacted"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {activity.status === "new"
                          ? "Nuevo"
                          : activity.status === "contacted"
                            ? "Contactado"
                            : "Vendido"}
                      </Badge>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No hay actividad reciente</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Propiedad
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Ver Contactos
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Estadísticas
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Mapa de Propiedades
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Visualizaciones</span>
                <span className="font-semibold">{(stats.viewsThisMonth || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tasa de Conversión</span>
                <span className="font-semibold">{stats.conversionRate || 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Propiedades Vendidas</span>
                <span className="font-semibold">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Responder 3 consultas pendientes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Actualizar fotos de 2 propiedades</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Programar visitas para mañana</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
