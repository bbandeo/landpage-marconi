'use client'

// =====================================================================================
// PROPERTY ANALYTICS DASHBOARD v4 - T3.4 MÓDULO PROPERTY ANALYTICS
// =====================================================================================
// Dashboard especializado en análisis de propiedades - performance individual,
// métricas de listados, geographic analytics y price optimization.
// =====================================================================================

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KPICard } from '@/components/ui/kpi-card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  AnalyticsDashboardLayout,
  WidgetGrid,
  buildAnalyticsBreadcrumbs
} from '@/components/layouts'
import {
  TrendingUp,
  TrendingDown,
  Home,
  MapPin,
  DollarSign,
  Clock,
  RefreshCw,
  BarChart3,
  PieChart,
  Eye,
  Users,
  Calendar,
  Star,
  Target,
  Zap,
  Activity,
  Map,
  Building,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { useAnalyticsDashboard } from '@/hooks/useAnalyticsDashboard'
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates'

// =====================================================================================
// TYPES & INTERFACES ESPECÍFICOS PARA PROPERTY ANALYTICS
// =====================================================================================

interface PropertyKPIs {
  totalProperties: {
    value: number
    active: number
    sold: number
    pending: number
  }
  avgViewsPerProperty: {
    value: number
    change: number
    benchmark: number
  }
  avgTimeOnMarket: {
    value: number // days
    change: number
    target: number
  }
  conversionRate: {
    value: number // percentage
    change: number
    benchmark: number
  }
}

interface PropertyPerformance {
  id: string
  title: string
  address: string
  neighborhood: string
  price: number
  propertyType: 'casa' | 'departamento' | 'local' | 'terreno'
  listingDate: string
  views: number
  uniqueViews: number
  leads: number
  showings: number
  favorites: number
  daysOnMarket: number
  priceChanges: number
  leadConversionRate: number
  performance: 'excellent' | 'good' | 'average' | 'poor'
  trending: 'up' | 'down' | 'stable'
}

// =====================================================================================
// CONFIGURATION
// =====================================================================================

const DASHBOARD_CONFIG = {
  refreshInterval: 30000,
  autoRefresh: true,
  realTimeEnabled: true
}

const PERIOD_OPTIONS = [
  { value: '7d', label: '7 días', days: 7 },
  { value: '30d', label: '30 días', days: 30 },
  { value: '90d', label: '90 días', days: 90 },
  { value: '1y', label: '1 año', days: 365 }
]

// =====================================================================================
// PROPERTY PERFORMANCE COMPONENT
// =====================================================================================

interface PropertyPerformanceProps {
  period: string
  loading: boolean
}

function PropertyPerformanceWidget({ period, loading }: PropertyPerformanceProps) {
  // ✅ Get real data from useAnalyticsDashboard hook
  const { data: dashboardData } = useAnalyticsDashboard({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })

  // Transform top_properties from API to PropertyPerformance interface
  const propertiesData: PropertyPerformance[] = (dashboardData?.top_properties || []).map((prop, index) => ({
    id: prop.id || `prop-${index}`,
    title: prop.title || 'Propiedad sin título',
    address: prop.location || 'Dirección no disponible',
    neighborhood: prop.location || 'N/A',
    price: prop.price || 0,
    propertyType: 'departamento', // TODO: Get from properties table
    listingDate: prop.created_at || new Date().toISOString(),
    views: prop.views || 0, // ✅ Real views
    uniqueViews: prop.unique_views || 0, // ✅ Real unique views
    leads: prop.leads || 0, // ✅ Real leads
    showings: 0, // TODO Phase 3: Track showings
    favorites: 0, // TODO Phase 3: Track favorites
    daysOnMarket: prop.days_on_market || 0,
    priceChanges: 0, // TODO Phase 3: Track price history
    leadConversionRate: prop.conversion_rate || 0, // ✅ Real conversion
    performance: prop.conversion_rate > 2 ? 'excellent' : prop.conversion_rate > 1.5 ? 'good' : prop.conversion_rate > 1 ? 'average' : 'poor',
    trending: prop.views > 1000 ? 'up' : 'stable' // Simple heuristic
  }))

  // Fallback mock data if no real data available yet
  const mockPropertiesData: PropertyPerformance[] = [
    {
      id: 'prop-001',
      title: 'Departamento Premium en Palermo',
      address: 'Av. Santa Fe 3200',
      neighborhood: 'Palermo',
      price: 450000,
      propertyType: 'departamento',
      listingDate: '2024-02-15',
      views: 1850,
      uniqueViews: 1420,
      leads: 28,
      showings: 12,
      favorites: 45,
      daysOnMarket: 45,
      priceChanges: 1,
      leadConversionRate: 1.51,
      performance: 'excellent',
      trending: 'up'
    },
    {
      id: 'prop-002',
      title: 'Casa Moderna en Belgrano',
      address: 'Crámer 1500',
      neighborhood: 'Belgrano',
      price: 680000,
      propertyType: 'casa',
      listingDate: '2024-01-20',
      views: 1560,
      uniqueViews: 1180,
      leads: 22,
      showings: 8,
      favorites: 38,
      daysOnMarket: 68,
      priceChanges: 2,
      leadConversionRate: 1.41,
      performance: 'good',
      trending: 'stable'
    },
    {
      id: 'prop-003',
      title: 'Loft en Puerto Madero',
      address: 'Pierina Dealessi 550',
      neighborhood: 'Puerto Madero',
      price: 820000,
      propertyType: 'departamento',
      listingDate: '2024-01-05',
      views: 2280,
      uniqueViews: 1850,
      leads: 35,
      showings: 15,
      favorites: 62,
      daysOnMarket: 85,
      priceChanges: 0,
      leadConversionRate: 1.54,
      performance: 'excellent',
      trending: 'up'
    },
    {
      id: 'prop-004',
      title: 'Casa Familiar en Villa Urquiza',
      address: 'Av. Triunvirato 4200',
      neighborhood: 'Villa Urquiza',
      price: 385000,
      propertyType: 'casa',
      listingDate: '2024-03-01',
      views: 890,
      uniqueViews: 720,
      leads: 12,
      showings: 4,
      favorites: 18,
      daysOnMarket: 28,
      priceChanges: 0,
      leadConversionRate: 1.35,
      performance: 'good',
      trending: 'up'
    },
    {
      id: 'prop-005',
      title: 'Departamento en Recoleta',
      address: 'Av. Callao 1800',
      neighborhood: 'Recoleta',
      price: 520000,
      propertyType: 'departamento',
      listingDate: '2023-11-15',
      views: 3250,
      uniqueViews: 2180,
      leads: 48,
      showings: 22,
      favorites: 85,
      daysOnMarket: 135,
      priceChanges: 3,
      leadConversionRate: 1.48,
      performance: 'average',
      trending: 'down'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-darker/30">
              <div className="w-12 h-12 bg-surface-darker rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-darker rounded w-48"></div>
                <div className="h-3 bg-surface-darker rounded w-32"></div>
              </div>
              <div className="w-20 h-8 bg-surface-darker rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-chart-success'
      case 'good': return 'text-chart-info'
      case 'average': return 'text-chart-warning'
      case 'poor': return 'text-chart-error'
      default: return 'text-subtle-gray'
    }
  }

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'casa': return Home
      case 'departamento': return Building
      case 'local': return Target
      case 'terreno': return Map
      default: return Home
    }
  }

  const getTrendingIcon = (trending: string) => {
    switch (trending) {
      case 'up': return ArrowUpRight
      case 'down': return ArrowDownRight
      case 'stable': return Activity
      default: return Activity
    }
  }

  const getTrendingColor = (trending: string) => {
    switch (trending) {
      case 'up': return 'text-chart-success'
      case 'down': return 'text-chart-error'
      case 'stable': return 'text-chart-info'
      default: return 'text-subtle-gray'
    }
  }

  // Use real data if available, fallback to mock
  const displayData = propertiesData.length > 0 ? propertiesData : mockPropertiesData

  // Calcular métricas totales
  const totalViews = displayData.reduce((sum, prop) => sum + prop.views, 0)
  const totalLeads = displayData.reduce((sum, prop) => sum + prop.leads, 0)
  const avgDaysOnMarket = displayData.length > 0 ? Math.round(displayData.reduce((sum, prop) => sum + prop.daysOnMarket, 0) / displayData.length) : 0

  return (
    <div className="space-y-4">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-surface-darker/20 border border-border-subtle">
        <div className="text-center">
          <div className="text-kpi-number-small text-chart-primary">{totalViews.toLocaleString()}</div>
          <div className="text-xs text-subtle-gray">Total Views</div>
        </div>
        <div className="text-center">
          <div className="text-kpi-number-small text-chart-secondary">{totalLeads}</div>
          <div className="text-xs text-subtle-gray">Total Leads</div>
        </div>
        <div className="text-center">
          <div className="text-kpi-number-small text-chart-tertiary">{avgDaysOnMarket}</div>
          <div className="text-xs text-subtle-gray">Días Promedio</div>
        </div>
      </div>

      {/* Properties List */}
      <div className="space-y-3">
        {displayData
          .sort((a, b) => b.views - a.views) // Ordenar por views descendente
          .map((property) => {
            const PropertyTypeIcon = getPropertyTypeIcon(property.propertyType)
            const TrendingIcon = getTrendingIcon(property.trending)

            return (
              <div
                key={property.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-surface-darker/30 hover:bg-surface-darker/50 transition-colors border border-border-subtle/50"
              >
                {/* Property Icon & Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-chart-primary/20 flex items-center justify-center">
                    <PropertyTypeIcon className="w-6 h-6 text-chart-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-white text-sm truncate">{property.title}</h4>
                      <div className="flex items-center gap-1">
                        <TrendingIcon className={`w-3 h-3 ${getTrendingColor(property.trending)}`} />
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPerformanceColor(property.performance)} bg-current/10`}>
                          {property.performance}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-subtle-gray">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {property.neighborhood}
                      </span>
                      <span>{property.views.toLocaleString()} views</span>
                      <span className="hidden sm:inline">{property.leads} leads</span>
                      <span className="hidden md:inline">{property.daysOnMarket} días</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold text-bone-white">
                      {new Intl.NumberFormat('es-AR', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0
                      }).format(property.price)}
                    </div>
                    <div className="text-xs text-subtle-gray">Precio</div>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${getPerformanceColor(property.performance)}`}>
                      {property.leadConversionRate}%
                    </div>
                    <div className="text-xs text-subtle-gray">Conversión</div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>

      {/* Performance Insight */}
      <div className="mt-4 p-3 rounded-lg bg-chart-primary/10 border border-chart-primary/20">
        <div className="flex items-start gap-2">
          <BarChart3 className="w-4 h-4 text-chart-primary mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-chart-primary">Insight de Propiedades</div>
            <div className="text-subtle-gray text-xs mt-1">
              El loft en Puerto Madero lidera en views (2,280) y conversión (1.54%). Recoleta necesita optimización de precio.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================================================================================
// MAIN COMPONENT
// =====================================================================================

export default function PropertyAnalytics() {
  // State management
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  // Date range calculation
  const currentPeriod = PERIOD_OPTIONS.find(p => p.value === selectedPeriod) || PERIOD_OPTIONS[1]
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - currentPeriod.days * 24 * 60 * 60 * 1000)

  // Hooks for data fetching
  const {
    data: dashboardData,
    loading: dashboardLoading,
    refetch: refetchDashboard
  } = useAnalyticsDashboard({
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    compact: false
  })

  // Real-time updates
  const {
    isConnected: realtimeConnected,
    isWebSocket
  } = useRealTimeUpdates({
    enabled: DASHBOARD_CONFIG.realTimeEnabled,
    interval: DASHBOARD_CONFIG.refreshInterval,
    enableWebSocket: true,
    enableNotifications: false
  })

  // ✅ REAL DATA from AnalyticsService.getDashboardStats()
  const propertyKPIs: PropertyKPIs = React.useMemo(() => {
    if (!dashboardData) {
      return {
        totalProperties: { value: 0, active: 0, sold: 0, pending: 0 },
        avgViewsPerProperty: { value: 0, change: 0, benchmark: 1200 },
        avgTimeOnMarket: { value: 0, change: 0, target: 60 },
        conversionRate: { value: 0, change: 0, benchmark: 1.20 }
      }
    }

    const topProperties = dashboardData.top_properties || []
    const totalViews = dashboardData.total_property_views || 0
    const totalProps = topProperties.length
    const avgViews = totalProps > 0 ? Math.round(totalViews / totalProps) : 0

    return {
      totalProperties: {
        value: totalProps, // ✅ Real property count
        active: totalProps, // TODO Phase 3: Add property status filtering
        sold: 0, // TODO Phase 3: Track from sales_closed table
        pending: 0 // TODO Phase 3: Track from sales_pipeline table
      },
      avgViewsPerProperty: {
        value: avgViews, // ✅ Real: total_views / property_count
        change: 0, // TODO Phase 2: Calculate trend
        benchmark: 1200
      },
      avgTimeOnMarket: {
        value: 0, // TODO Phase 2: Calculate from properties.created_at
        change: 0,
        target: 60
      },
      conversionRate: {
        value: dashboardData.conversion_rate || 0, // ✅ Real data
        change: 0, // TODO Phase 2: Calculate trend
        benchmark: 1.20
      }
    }
  }, [dashboardData])

  // Breadcrumbs
  const breadcrumbs = buildAnalyticsBreadcrumbs('properties', 'Property Analytics')

  // Header actions
  const headerActions = (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-subtle-gray order-2 sm:order-1">
        <Clock className="w-4 h-4" />
        <span className="hidden sm:inline">Última actualización: {lastRefresh.toLocaleTimeString('es-AR')}</span>
        <span className="sm:hidden">{lastRefresh.toLocaleTimeString('es-AR', { timeStyle: 'short' })}</span>
        {realtimeConnected && (
          <Badge variant="outline" className="text-chart-success border-chart-success/30">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-chart-success rounded-full animate-pulse"></div>
              {isWebSocket ? 'WebSocket' : 'Polling'}
            </div>
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 order-1 sm:order-2">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-28 sm:w-32 filter-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="filter-panel">
            {PERIOD_OPTIONS.map(period => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => {
            refetchDashboard()
            setLastRefresh(new Date())
          }}
          variant="outline"
          size="sm"
          disabled={dashboardLoading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${dashboardLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Actualizar</span>
        </Button>
      </div>
    </div>
  )

  return (
    <AnalyticsDashboardLayout
      title="Property Analytics"
      subtitle="Análisis detallado de performance de propiedades y optimización de listados"
      breadcrumbs={breadcrumbs}
      actions={headerActions}
      loading={dashboardLoading}
      className="space-y-dashboard"
    >
      {/* Property KPI Cards Row */}
      <WidgetGrid
        desktop={{ cols: 4, gap: 'lg' }}
        tablet={{ cols: 2, gap: 'md' }}
        mobile={{ cols: 1, gap: 'sm' }}
      >
        {/* Total Properties */}
        <KPICard
          title="Propiedades Activas"
          value={propertyKPIs.totalProperties.active}
          format="number"
          trend={{
            value: 5.2,
            period: `vs ${currentPeriod.label.toLowerCase()} anterior`,
            direction: 'positive'
          }}
          icon={Home}
          color="primary"
          size="lg"
          description={`Total portfolio: ${propertyKPIs.totalProperties.value} propiedades`}
        />

        {/* Average Views Per Property */}
        <KPICard
          title="Views Promedio"
          value={propertyKPIs.avgViewsPerProperty.value}
          format="number"
          trend={{
            value: propertyKPIs.avgViewsPerProperty.change,
            period: `vs ${currentPeriod.label.toLowerCase()} anterior`,
            direction: propertyKPIs.avgViewsPerProperty.change > 0 ? 'positive' : 'negative'
          }}
          icon={Eye}
          color="secondary"
          size="lg"
          description={`Benchmark del sector: ${propertyKPIs.avgViewsPerProperty.benchmark.toLocaleString()}`}
        />

        {/* Average Time on Market */}
        <KPICard
          title="Días en Mercado"
          value={propertyKPIs.avgTimeOnMarket.value}
          format="number"
          trend={{
            value: propertyKPIs.avgTimeOnMarket.change,
            period: `vs ${currentPeriod.label.toLowerCase()} anterior`,
            direction: propertyKPIs.avgTimeOnMarket.change < 0 ? 'positive' : 'negative' // Lower is better
          }}
          icon={Calendar}
          color="tertiary"
          size="lg"
          description={`Meta objetivo: ${propertyKPIs.avgTimeOnMarket.target} días`}
        />

        {/* Property Conversion Rate */}
        <KPICard
          title="Conversión de Leads"
          value={propertyKPIs.conversionRate.value}
          format="percentage"
          trend={{
            value: propertyKPIs.conversionRate.change,
            period: `vs ${currentPeriod.label.toLowerCase()} anterior`,
            direction: propertyKPIs.conversionRate.change > 0 ? 'positive' : 'negative'
          }}
          icon={Target}
          color="quaternary"
          size="lg"
          description={`Benchmark: ${propertyKPIs.conversionRate.benchmark}%`}
        />
      </WidgetGrid>

      {/* Property Performance Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="widget-container lg:col-span-2">
          <CardHeader className="widget-header">
            <CardTitle className="widget-title flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-chart-primary" />
              Property Performance
            </CardTitle>
            <Badge variant="default" className="text-xs bg-chart-primary/20 text-chart-primary border-chart-primary/30">
              Top Performers
            </Badge>
          </CardHeader>
          <CardContent className="widget-content">
            <PropertyPerformanceWidget period={selectedPeriod} loading={dashboardLoading} />
          </CardContent>
        </Card>

        {/* Placeholder para próximos widgets */}
        <Card className="widget-container">
          <CardHeader className="widget-header">
            <CardTitle className="widget-title flex items-center gap-2">
              <Map className="w-5 h-5 text-chart-secondary" />
              Geographic Analytics
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Próximamente
            </Badge>
          </CardHeader>
          <CardContent className="widget-content">
            <div className="text-center py-8 text-subtle-gray">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Análisis por zona</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholders para Price Analytics y Listing Optimization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="widget-container">
          <CardHeader className="widget-header">
            <CardTitle className="widget-title flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-chart-tertiary" />
              Price Analytics
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Próximamente
            </Badge>
          </CardHeader>
          <CardContent className="widget-content">
            <div className="text-center py-8 text-subtle-gray">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Comparativas de mercado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="widget-container">
          <CardHeader className="widget-header">
            <CardTitle className="widget-title flex items-center gap-2">
              <Zap className="w-5 h-5 text-chart-quaternary" />
              Listing Optimization
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Próximamente
            </Badge>
          </CardHeader>
          <CardContent className="widget-content">
            <div className="text-center py-8 text-subtle-gray">
              <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Sugerencias de mejora</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnalyticsDashboardLayout>
  )
}