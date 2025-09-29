'use client'

// =====================================================================================
// MARKETING ANALYTICS DASHBOARD v4 - T3.3 MÓDULO MARKETING & LEADS
// =====================================================================================
// Dashboard de marketing y generación de leads con análisis de canales, campañas
// ROI y website analytics. Sigue patrones de dashboard v4.
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
  Users,
  Target,
  DollarSign,
  Clock,
  RefreshCw,
  BarChart3,
  PieChart,
  Globe,
  Megaphone,
  MousePointer,
  Eye,
  Search,
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  TestTube
} from 'lucide-react'
import { useAnalyticsDashboard } from '@/hooks/useAnalyticsDashboard'
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates'

// =====================================================================================
// TYPES & INTERFACES ESPECÍFICOS PARA MARKETING
// =====================================================================================

interface MarketingKPIs {
  totalLeads: {
    value: number
    change: number
    cost: number
  }
  leadQuality: {
    value: number // percentage
    change: number
    benchmark: number
  }
  costPerLead: {
    value: number
    change: number
    target: number
  }
  websiteTraffic: {
    value: number
    change: number
    conversionRate: number
  }
}

interface ChannelPerformance {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  leads: number
  cost: number
  cpl: number // cost per lead
  conversionRate: number
  roi: number
  trend: number
  color: string
  status: 'active' | 'paused' | 'testing'
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
// CHANNEL PERFORMANCE COMPONENT
// =====================================================================================

interface ChannelPerformanceProps {
  period: string
  loading: boolean
}

function ChannelPerformanceWidget({ period, loading }: ChannelPerformanceProps) {
  // Mock data de canales de marketing - En el futuro vendrá de analytics API
  const channelsData: ChannelPerformance[] = [
    {
      id: 'google-ads',
      name: 'Google Ads',
      icon: Search,
      leads: 45,
      cost: 32000,
      cpl: 711,
      conversionRate: 3.2,
      roi: 185,
      trend: 12.5,
      color: '#4285F4',
      status: 'active'
    },
    {
      id: 'facebook-ads',
      name: 'Facebook Ads',
      icon: Facebook,
      leads: 38,
      cost: 28000,
      cpl: 737,
      conversionRate: 2.8,
      roi: 165,
      trend: -5.3,
      color: '#1877F2',
      status: 'active'
    },
    {
      id: 'instagram-ads',
      name: 'Instagram Ads',
      icon: Instagram,
      leads: 25,
      cost: 18000,
      cpl: 720,
      conversionRate: 2.1,
      roi: 142,
      trend: 18.7,
      color: '#E4405F',
      status: 'active'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      leads: 32,
      cost: 5000,
      cpl: 156,
      conversionRate: 8.5,
      roi: 320,
      trend: 25.8,
      color: '#25D366',
      status: 'active'
    },
    {
      id: 'email',
      name: 'Email Marketing',
      icon: Mail,
      leads: 18,
      cost: 3500,
      cpl: 194,
      conversionRate: 4.2,
      roi: 280,
      trend: 8.2,
      color: '#EA4335',
      status: 'active'
    },
    {
      id: 'referrals',
      name: 'Referidos',
      icon: UserPlus,
      leads: 12,
      cost: 2000,
      cpl: 167,
      conversionRate: 12.5,
      roi: 450,
      trend: 35.2,
      color: '#34A853',
      status: 'testing'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-darker/30">
              <div className="w-10 h-10 bg-surface-darker rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-darker rounded w-24"></div>
                <div className="h-3 bg-surface-darker rounded w-16"></div>
              </div>
              <div className="w-20 h-4 bg-surface-darker rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Calcular totales
  const totals = channelsData.reduce((acc, channel) => ({
    leads: acc.leads + channel.leads,
    cost: acc.cost + channel.cost,
    avgROI: acc.avgROI + channel.roi
  }), { leads: 0, cost: 0, avgROI: 0 })

  totals.avgROI = totals.avgROI / channelsData.length

  return (
    <div className="space-y-4">
      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-surface-darker/20 border border-border-subtle">
        <div className="text-center">
          <div className="text-kpi-number-small text-chart-primary">{totals.leads}</div>
          <div className="text-xs text-subtle-gray">Total Leads</div>
        </div>
        <div className="text-center">
          <div className="text-kpi-number-small text-chart-secondary">
            {new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'ARS',
              minimumFractionDigits: 0
            }).format(totals.cost)}
          </div>
          <div className="text-xs text-subtle-gray">Inversión Total</div>
        </div>
        <div className="text-center">
          <div className="text-kpi-number-small text-chart-success">{Math.round(totals.avgROI)}%</div>
          <div className="text-xs text-subtle-gray">ROI Promedio</div>
        </div>
      </div>

      {/* Channels List */}
      <div className="space-y-3">
        {channelsData
          .sort((a, b) => b.roi - a.roi) // Ordenar por ROI descendente
          .map((channel) => (
            <div
              key={channel.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-surface-darker/30 hover:bg-surface-darker/50 transition-colors border border-border-subtle/50"
            >
              {/* Channel Icon & Name */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${channel.color}20` }}
                >
                  <channel.icon className="w-5 h-5" style={{ color: channel.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white text-sm truncate">{channel.name}</h4>
                    <div className="flex items-center gap-1">
                      {channel.status === 'active' && (
                        <Play className="w-3 h-3 text-chart-success" />
                      )}
                      {channel.status === 'paused' && (
                        <Pause className="w-3 h-3 text-chart-warning" />
                      )}
                      {channel.status === 'testing' && (
                        <TestTube className="w-3 h-3 text-chart-info" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-subtle-gray">
                    <span>{channel.leads} leads</span>
                    <span>{channel.conversionRate}% conversión</span>
                    <span>CPL: {new Intl.NumberFormat('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 0
                    }).format(channel.cpl)}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="hidden sm:flex items-center gap-6 text-right">
                <div>
                  <div className="text-sm font-semibold text-bone-white">
                    {new Intl.NumberFormat('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 0
                    }).format(channel.cost)}
                  </div>
                  <div className="text-xs text-subtle-gray">Inversión</div>
                </div>
                <div>
                  <div className={`text-sm font-semibold ${
                    channel.roi >= 200 ? 'text-chart-success' :
                    channel.roi >= 150 ? 'text-chart-warning' : 'text-chart-error'
                  }`}>
                    {channel.roi}%
                  </div>
                  <div className="text-xs text-subtle-gray">ROI</div>
                </div>
              </div>

              {/* Trend Indicator */}
              <div className="flex items-center gap-1">
                <div className={`text-sm font-medium ${
                  channel.trend > 0 ? 'text-chart-success' : 'text-chart-error'
                }`}>
                  {channel.trend > 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>
                <span className={`text-xs ${
                  channel.trend > 0 ? 'text-chart-success' : 'text-chart-error'
                }`}>
                  {Math.abs(channel.trend)}%
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Performance Insights */}
      <div className="mt-4 p-3 rounded-lg bg-chart-success/10 border border-chart-success/20">
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-chart-success mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-chart-success">Insight de Rendimiento</div>
            <div className="text-subtle-gray text-xs mt-1">
              WhatsApp tiene el mejor ROI (320%) y menor CPL. Considera aumentar inversión en este canal.
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

export default function MarketingAnalytics() {
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

  // Mock marketing KPIs - En el futuro estos vendrán de la API
  const marketingKPIs: MarketingKPIs = {
    totalLeads: {
      value: dashboardData?.leads_count || 156,
      change: 12.5,
      cost: 85000
    },
    leadQuality: {
      value: 68,
      change: 8.3,
      benchmark: 65
    },
    costPerLead: {
      value: 545,
      change: -15.2,
      target: 500
    },
    websiteTraffic: {
      value: dashboardData?.sessions_count || 1250,
      change: 23.7,
      conversionRate: dashboardData?.conversion_rate || 4.5
    }
  }

  // Breadcrumbs
  const breadcrumbs = buildAnalyticsBreadcrumbs('marketing', 'Marketing & Leads')

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
      title="Marketing & Leads"
      subtitle="Análisis de generación de leads, canales y ROI de marketing"
      breadcrumbs={breadcrumbs}
      actions={headerActions}
      loading={dashboardLoading}
      className="space-y-dashboard"
    >
      {/* Marketing KPI Cards Row */}
      <WidgetGrid
        desktop={{ cols: 4, gap: 'lg' }}
        tablet={{ cols: 2, gap: 'md' }}
        mobile={{ cols: 1, gap: 'sm' }}
      >
        {/* Total Leads Generated */}
        <KPICard
          title="Leads Generados"
          value={marketingKPIs.totalLeads.value}
          format="number"
          trend={{
            value: marketingKPIs.totalLeads.change,
            period: `vs ${currentPeriod.label.toLowerCase()} anterior`,
            direction: marketingKPIs.totalLeads.change > 0 ? 'positive' : 'negative'
          }}
          icon={Users}
          color="primary"
          size="lg"
          description={`Inversión: ${new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
          }).format(marketingKPIs.totalLeads.cost)}`}
        />

        {/* Lead Quality Score */}
        <KPICard
          title="Calidad de Leads"
          value={marketingKPIs.leadQuality.value}
          format="percentage"
          trend={{
            value: marketingKPIs.leadQuality.change,
            period: `vs ${currentPeriod.label.toLowerCase()} anterior`,
            direction: marketingKPIs.leadQuality.change > 0 ? 'positive' : 'negative'
          }}
          icon={Target}
          color="secondary"
          size="lg"
          description={`Benchmark del sector: ${marketingKPIs.leadQuality.benchmark}%`}
        />

        {/* Cost Per Lead */}
        <KPICard
          title="Costo por Lead"
          value={marketingKPIs.costPerLead.value}
          format="currency"
          trend={{
            value: marketingKPIs.costPerLead.change,
            period: `vs ${currentPeriod.label.toLowerCase()} anterior`,
            direction: marketingKPIs.costPerLead.change < 0 ? 'positive' : 'negative' // Lower is better
          }}
          icon={DollarSign}
          color="tertiary"
          size="lg"
          description={`Meta: ${new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
          }).format(marketingKPIs.costPerLead.target)}`}
        />

        {/* Website Traffic */}
        <KPICard
          title="Tráfico Web"
          value={marketingKPIs.websiteTraffic.value}
          format="number"
          trend={{
            value: marketingKPIs.websiteTraffic.change,
            period: `vs ${currentPeriod.label.toLowerCase()} anterior`,
            direction: marketingKPIs.websiteTraffic.change > 0 ? 'positive' : 'negative'
          }}
          icon={Globe}
          color="quaternary"
          size="lg"
          description={`Conversión: ${marketingKPIs.websiteTraffic.conversionRate}%`}
        />
      </WidgetGrid>

      {/* Placeholder para futuras features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="widget-container lg:col-span-2">
          <CardHeader className="widget-header">
            <CardTitle className="widget-title flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-chart-secondary" />
              Channel Performance
            </CardTitle>
            <Badge variant="default" className="text-xs bg-chart-secondary/20 text-chart-secondary border-chart-secondary/30">
              ROI & Costos
            </Badge>
          </CardHeader>
          <CardContent className="widget-content">
            <ChannelPerformanceWidget period={selectedPeriod} loading={dashboardLoading} />
          </CardContent>
        </Card>

        <Card className="widget-container">
          <CardHeader className="widget-header">
            <CardTitle className="widget-title flex items-center gap-2">
              <PieChart className="w-5 h-5 text-chart-tertiary" />
              Campaign Analysis
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Próximamente
            </Badge>
          </CardHeader>
          <CardContent className="widget-content">
            <div className="text-center py-8 text-subtle-gray">
              <MousePointer className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>UTM tracking y ROI</p>
            </div>
          </CardContent>
        </Card>

        <Card className="widget-container">
          <CardHeader className="widget-header">
            <CardTitle className="widget-title flex items-center gap-2">
              <Eye className="w-5 h-5 text-chart-quaternary" />
              Website Analytics
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Próximamente
            </Badge>
          </CardHeader>
          <CardContent className="widget-content">
            <div className="text-center py-8 text-subtle-gray">
              <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Traffic y engagement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnalyticsDashboardLayout>
  )
}