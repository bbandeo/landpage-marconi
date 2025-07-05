"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Users,
  DollarSign,
  Eye,
  Plus,
  Settings,
  MessageSquare,
  TrendingUp,
  Calendar,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

interface DashboardStats {
  totalProperties: number
  totalLeads: number
  totalRevenue: number
  totalViews: number
}

interface RecentActivity {
  id: string
  type: "lead" | "property" | "sale"
  title: string
  description: string
  time: string
  icon: string
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalLeads: 0,
    totalRevenue: 0,
    totalViews: 0,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch stats
      const statsResponse = await fetch("/api/dashboard/stats")
      if (!statsResponse.ok) {
        throw new Error("Error fetching stats")
      }
      const statsData = await statsResponse.json()
      setStats(statsData)

      // Fetch recent activity
      const activityResponse = await fetch("/api/dashboard/recent-activity")
      if (!activityResponse.ok) {
        throw new Error("Error fetching recent activity")
      }
      const activityData = await activityResponse.json()
      setRecentActivity(activityData.recentActivity || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Error al cargar los datos del dashboard")

      // Set fallback data
      setStats({
        totalProperties: 24,
        totalLeads: 156,
        totalRevenue: 2450000,
        totalViews: 8924,
      })
      setRecentActivity([
        {
          id: "1",
          type: "lead",
          title: "Nuevo contacto: María González",
          description: "Interesada en casa de 3 dormitorios",
          time: new Date(Date.now() - 1000 * 60 * 15).toLocaleString("es-AR"),
          icon: "👤",
        },
        {
          id: "2",
          type: "property",
          title: "Propiedad actualizada: Casa Barrio Norte",
          description: "Precio reducido a $85.000 USD",
          time: new Date(Date.now() - 1000 * 60 * 45).toLocaleString("es-AR"),
          icon: "🏠",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-AR").format(num)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Marconi Inmobiliaria - Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Propiedad
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Bell className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{error}</p>
                <p className="text-xs text-yellow-600 mt-1">Mostrando datos de ejemplo</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Propiedades Activas</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.totalProperties)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12% desde el mes pasado
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.totalLeads)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +23% desde el mes pasado
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +8% desde el mes pasado
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.totalViews)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  -2% desde el mes pasado
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas actualizaciones y contactos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                    <Badge variant={activity.type === "lead" ? "default" : "secondary"}>
                      {activity.type === "lead" ? "Lead" : "Propiedad"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Tasks */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Propiedad
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ver Contactos
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Reportes
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas del Mes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tasa de Conversión</span>
                  <span className="text-sm font-medium">12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tiempo Respuesta</span>
                  <span className="text-sm font-medium">15 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Propiedades Vendidas</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Satisfacción Cliente</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Tareas Pendientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Visita programada</p>
                    <p className="text-xs text-gray-500">Hoy 15:00</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Responder consultas</p>
                    <p className="text-xs text-gray-500">3 pendientes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Home className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Actualizar precios</p>
                    <p className="text-xs text-gray-500">2 propiedades</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
