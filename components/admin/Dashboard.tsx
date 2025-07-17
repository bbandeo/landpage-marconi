"use client"

import { useState, useEffect } from "react"
import {
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Eye,
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface DashboardStats {
  totalProperties: number
  totalContacts: number
  monthlyViews: number
  monthlyRevenue: number
  newContacts: number
  activeProperties: number
  conversionRate: number
  avgResponseTime: number
}

interface RecentActivity {
  id: number
  type: "contact" | "property" | "view"
  title: string
  description: string
  time: string
  status?: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalContacts: 0,
    monthlyViews: 0,
    monthlyRevenue: 0,
    newContacts: 0,
    activeProperties: 0,
    conversionRate: 0,
    avgResponseTime: 0,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch("/api/dashboard/stats")
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        } else {
          // Mock data for development
          setStats({
            totalProperties: 45,
            totalContacts: 128,
            monthlyViews: 2340,
            monthlyRevenue: 125000,
            newContacts: 23,
            activeProperties: 38,
            conversionRate: 12.5,
            avgResponseTime: 2.3,
          })
        }

        // Fetch recent activity
        const activityResponse = await fetch("/api/dashboard/recent-activity")
        if (activityResponse.ok) {
          const activityData = await activityResponse.json()
          setRecentActivity(activityData)
        } else {
          // Mock data for development
          setRecentActivity([
            {
              id: 1,
              type: "contact",
              title: "Nueva consulta",
              description: "María González consultó sobre Casa en Belgrano",
              time: "Hace 5 minutos",
              status: "new",
            },
            {
              id: 2,
              type: "property",
              title: "Propiedad actualizada",
              description: "Departamento en Palermo - Precio actualizado",
              time: "Hace 1 hora",
            },
            {
              id: 3,
              type: "view",
              title: "Visita programada",
              description: "Juan Pérez programó visita para mañana 15:00",
              time: "Hace 2 horas",
            },
            {
              id: 4,
              type: "contact",
              title: "Contacto convertido",
              description: "Ana Rodríguez firmó contrato de alquiler",
              time: "Hace 3 horas",
              status: "converted",
            },
          ])
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        // Set mock data on error
        setStats({
          totalProperties: 45,
          totalContacts: 128,
          monthlyViews: 2340,
          monthlyRevenue: 125000,
          newContacts: 23,
          activeProperties: 38,
          conversionRate: 12.5,
          avgResponseTime: 2.3,
        })
        setRecentActivity([
          {
            id: 1,
            type: "contact",
            title: "Nueva consulta",
            description: "María González consultó sobre Casa en Belgrano",
            time: "Hace 5 minutos",
            status: "new",
          },
          {
            id: 2,
            type: "property",
            title: "Propiedad actualizada",
            description: "Departamento en Palermo - Precio actualizado",
            time: "Hace 1 hora",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "contact":
        return <Users className="w-4 h-4" />
      case "property":
        return <Building2 className="w-4 h-4" />
      case "view":
        return <Eye className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "contact":
        return "bg-blue-100 text-blue-600"
      case "property":
        return "bg-green-100 text-green-600"
      case "view":
        return "bg-purple-100 text-purple-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Resumen de tu actividad inmobiliaria</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild>
            <Link href="/admin/properties/new">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Propiedad
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Propiedades</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +12% desde el mes pasado
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contactos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +23% desde el mes pasado
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vistas Mensuales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +8% desde el mes pasado
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                -3% desde el mes pasado
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Contactos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.newContacts}</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Propiedades Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeProperties}</div>
            <p className="text-xs text-muted-foreground">Publicadas actualmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</div>
            <Progress value={stats.conversionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.avgResponseTime}h</div>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      {activity.status && (
                        <Badge variant={activity.status === "new" ? "default" : "secondary"} className="ml-2">
                          {activity.status === "new" ? "Nuevo" : "Convertido"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Tareas comunes para gestionar tu negocio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <Button asChild className="justify-start h-auto p-4">
                <Link href="/admin/properties/new">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Plus className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Agregar Propiedad</p>
                      <p className="text-sm text-gray-500">Publicar una nueva propiedad</p>
                    </div>
                  </div>
                </Link>
              </Button>

              <Button asChild variant="outline" className="justify-start h-auto p-4 bg-transparent">
                <Link href="/admin/contacts">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Ver Contactos</p>
                      <p className="text-sm text-gray-500">Gestionar leads y consultas</p>
                    </div>
                  </div>
                </Link>
              </Button>

              <Button asChild variant="outline" className="justify-start h-auto p-4 bg-transparent">
                <Link href="/admin/properties">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Gestionar Propiedades</p>
                      <p className="text-sm text-gray-500">Editar propiedades existentes</p>
                    </div>
                  </div>
                </Link>
              </Button>

              <Button asChild variant="outline" className="justify-start h-auto p-4 bg-transparent">
                <Link href="/admin/settings">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Ver Reportes</p>
                      <p className="text-sm text-gray-500">Analizar rendimiento</p>
                    </div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
