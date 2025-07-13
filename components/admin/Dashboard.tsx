"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Users, TrendingUp, Eye, Plus, BarChart3, ArrowUpRight, Building2 } from "lucide-react"

interface DashboardStats {
  totalProperties: number
  totalLeads: number
  totalViews: number
  featuredProperties: number
}

interface RecentProperty {
  id: number
  title: string
  price: number
  status: string
  created_at: string
}

interface RecentLead {
  id: number
  name: string
  email: string
  created_at: string
  status: string
}

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalLeads: 0,
    totalViews: 0,
    featuredProperties: 0,
  })
  const [recentProperties, setRecentProperties] = useState<RecentProperty[]>([])
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/dashboard/recent-activity"),
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      if (activityResponse.ok) {
        const activityData = await activityResponse.json()
        setRecentProperties(activityData.recentProperties || [])
        setRecentLeads(activityData.recentLeads || [])
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNavigateToProperties = () => {
    router.push("/admin/properties")
  }

  const handleNavigateToNewProperty = () => {
    router.push("/admin/properties/new")
  }

  const handleNavigateToContacts = () => {
    router.push("/admin/contacts")
  }

  const handleNavigateToReports = () => {
    router.push("/admin/reports")
  }

  const handlePropertyClick = (propertyId: number) => {
    router.push(`/admin/properties/${propertyId}/edit`)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "available":
      case "Disponible":
        return "default"
      case "sold":
      case "Vendido":
        return "secondary"
      case "rented":
      case "Alquilado":
        return "outline"
      case "reserved":
      case "Reservado":
        return "destructive"
      default:
        return "default"
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Propiedades</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              <Button variant="link" className="p-0 h-auto text-xs" onClick={handleNavigateToProperties}>
                Ver todas <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contactos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              <Button variant="link" className="p-0 h-auto text-xs" onClick={handleNavigateToContacts}>
                Ver contactos <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              <Button variant="link" className="p-0 h-auto text-xs" onClick={handleNavigateToReports}>
                Ver reportes <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destacadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredProperties}</div>
            <p className="text-xs text-muted-foreground">Propiedades destacadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button onClick={handleNavigateToNewProperty} className="h-20 flex-col gap-2">
          <Plus className="h-6 w-6" />
          Nueva Propiedad
        </Button>
        <Button variant="outline" onClick={handleNavigateToProperties} className="h-20 flex-col gap-2 bg-transparent">
          <Home className="h-6 w-6" />
          Ver Propiedades
        </Button>
        <Button variant="outline" onClick={handleNavigateToContacts} className="h-20 flex-col gap-2 bg-transparent">
          <Users className="h-6 w-6" />
          Ver Contactos
        </Button>
        <Button variant="outline" onClick={handleNavigateToReports} className="h-20 flex-col gap-2 bg-transparent">
          <BarChart3 className="h-6 w-6" />
          Ver Reportes
        </Button>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Propiedades Recientes</CardTitle>
            <CardDescription>Últimas propiedades agregadas al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.length > 0 ? (
                recentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handlePropertyClick(property.id)}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{property.title}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(property.price)}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant={getStatusBadgeVariant(property.status)}>{property.status}</Badge>
                      <p className="text-xs text-muted-foreground">{formatDate(property.created_at)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No hay propiedades recientes</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contactos Recientes</CardTitle>
            <CardDescription>Últimos contactos recibidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="outline">{lead.status}</Badge>
                      <p className="text-xs text-muted-foreground">{formatDate(lead.created_at)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No hay contactos recientes</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
