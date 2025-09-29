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

interface CampaignData {
  id: string
  name: string
  channel: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  startDate: string
  endDate: string
  budget: number
  spent: number
  leads: number
  conversions: number
  revenue: number
  roi: number
  cpl: number
  conversionRate: number
  clickThroughRate: number
  status: 'active' | 'paused' | 'completed' | 'draft'
  performance: 'excellent' | 'good' | 'average' | 'poor'
}

interface WebsiteAnalyticsData {
  trafficSources: {
    source: string
    sessions: number
    percentage: number
    bounceRate: number
    avgSessionDuration: number
    conversions: number
    conversionRate: number
  }[]
  topPages: {
    page: string
    title: string
    pageviews: number
    uniquePageviews: number
    avgTimeOnPage: number
    bounceRate: number
    exitRate: number
    conversions: number
  }[]
  overallMetrics: {
    totalSessions: number
    totalPageviews: number
    avgSessionDuration: number
    bounceRate: number
    newUsersPercentage: number
    totalConversions: number
    overallConversionRate: number
  }
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
// CAMPAIGN ROI ANALYSIS COMPONENT
// =====================================================================================

interface CampaignROIProps {
  period: string
  loading: boolean
}

function CampaignROIWidget({ period, loading }: CampaignROIProps) {
  // Mock data de campañas - En el futuro vendrá de analytics API con UTM tracking
  const campaignsData: CampaignData[] = [
    {
      id: 'google-search-2024-q1',
      name: 'Google Search - Propiedades Premium',
      channel: 'Google Ads',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'propiedades-premium-2024',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      budget: 25000,
      spent: 22500,
      leads: 38,
      conversions: 12,
      revenue: 450000,
      roi: 1900,
      cpl: 592,
      conversionRate: 31.6,
      clickThroughRate: 4.2,
      status: 'active',
      performance: 'excellent'
    },
    {
      id: 'facebook-lookalike-q1',
      name: 'Facebook Lookalike - Inversores',
      channel: 'Facebook Ads',
      utmSource: 'facebook',
      utmMedium: 'social',
      utmCampaign: 'lookalike-inversores-2024',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      budget: 18000,
      spent: 16200,
      leads: 25,
      conversions: 6,
      revenue: 280000,
      roi: 1630,
      cpl: 648,
      conversionRate: 24.0,
      clickThroughRate: 3.1,
      status: 'active',
      performance: 'excellent'
    },
    {
      id: 'instagram-stories-q1',
      name: 'Instagram Stories - Jóvenes Profesionales',
      channel: 'Instagram Ads',
      utmSource: 'instagram',
      utmMedium: 'social',
      utmCampaign: 'jovenes-profesionales-2024',
      startDate: '2024-01-20',
      endDate: '2024-03-20',
      budget: 12000,
      spent: 11400,
      leads: 18,
      conversions: 3,
      revenue: 165000,
      roi: 1347,
      cpl: 633,
      conversionRate: 16.7,
      clickThroughRate: 2.8,
      status: 'completed',
      performance: 'good'
    },
    {
      id: 'google-display-retargeting',
      name: 'Google Display - Retargeting',
      channel: 'Google Ads',
      utmSource: 'google',
      utmMedium: 'display',
      utmCampaign: 'retargeting-visitantes-2024',
      startDate: '2024-02-10',
      endDate: '2024-05-10',
      budget: 8000,
      spent: 6800,
      leads: 14,
      conversions: 2,
      revenue: 95000,
      roi: 1297,
      cpl: 486,
      conversionRate: 14.3,
      clickThroughRate: 1.9,
      status: 'active',
      performance: 'good'
    },
    {
      id: 'email-nurturing-q1',
      name: 'Email Nurturing - Base Existente',
      channel: 'Email Marketing',
      utmSource: 'email',
      utmMedium: 'email',
      utmCampaign: 'nurturing-base-2024',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      budget: 3500,
      spent: 2800,
      leads: 12,
      conversions: 4,
      revenue: 180000,
      roi: 6329,
      cpl: 233,
      conversionRate: 33.3,
      clickThroughRate: 8.5,
      status: 'completed',
      performance: 'excellent'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center justify-between p-4 rounded-lg bg-surface-darker/30">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-darker rounded w-48"></div>
                <div className="h-3 bg-surface-darker rounded w-32"></div>
              </div>
              <div className="space-y-1 text-right">
                <div className="h-4 bg-surface-darker rounded w-16"></div>
                <div className="h-3 bg-surface-darker rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Calcular métricas agregadas
  const totalBudget = campaignsData.reduce((sum, campaign) => sum + campaign.budget, 0)
  const totalSpent = campaignsData.reduce((sum, campaign) => sum + campaign.spent, 0)
  const totalLeads = campaignsData.reduce((sum, campaign) => sum + campaign.leads, 0)
  const totalRevenue = campaignsData.reduce((sum, campaign) => sum + campaign.revenue, 0)
  const avgROI = campaignsData.reduce((sum, campaign) => sum + campaign.roi, 0) / campaignsData.length

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-chart-success'
      case 'good': return 'text-chart-info'
      case 'average': return 'text-chart-warning'
      case 'poor': return 'text-chart-error'
      default: return 'text-subtle-gray'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-chart-success'
      case 'paused': return 'text-chart-warning'
      case 'completed': return 'text-chart-info'
      case 'draft': return 'text-subtle-gray'
      default: return 'text-subtle-gray'
    }
  }

  return (
    <div className="space-y-4">
      {/* Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg bg-surface-darker/20 border border-border-subtle">
        <div className="text-center">
          <div className="text-sm font-semibold text-chart-primary">{totalLeads}</div>
          <div className="text-xs text-subtle-gray">Total Leads</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-chart-secondary">
            {Math.round(avgROI)}%
          </div>
          <div className="text-xs text-subtle-gray">ROI Promedio</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-chart-tertiary">
            {new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'ARS',
              minimumFractionDigits: 0
            }).format(totalSpent)}
          </div>
          <div className="text-xs text-subtle-gray">Gastado</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-chart-success">
            {new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'ARS',
              minimumFractionDigits: 0
            }).format(totalRevenue)}
          </div>
          <div className="text-xs text-subtle-gray">Revenue</div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-2">
        {campaignsData
          .sort((a, b) => b.roi - a.roi) // Ordenar por ROI descendente
          .map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between p-3 rounded-lg bg-surface-darker/30 hover:bg-surface-darker/50 transition-colors border border-border-subtle/50"
            >
              {/* Campaign Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-white text-sm truncate">{campaign.name}</h4>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      campaign.status === 'active' ? 'bg-chart-success' :
                      campaign.status === 'paused' ? 'bg-chart-warning' :
                      campaign.status === 'completed' ? 'bg-chart-info' : 'bg-subtle-gray'
                    }`}></div>
                    <span className={`text-xs capitalize ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-subtle-gray">
                  <span>{campaign.channel}</span>
                  <span>{campaign.leads} leads</span>
                  <span className="hidden sm:inline">{campaign.conversionRate}% conv.</span>
                  <span className="hidden md:inline">
                    UTM: {campaign.utmSource}/{campaign.utmMedium}
                  </span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="flex items-center gap-4 text-right">
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-bone-white">
                    {new Intl.NumberFormat('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 0
                    }).format(campaign.spent)}
                  </div>
                  <div className="text-xs text-subtle-gray">
                    de {new Intl.NumberFormat('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 0
                    }).format(campaign.budget)}
                  </div>
                </div>
                <div>
                  <div className={`text-sm font-semibold ${getPerformanceColor(campaign.performance)}`}>
                    {campaign.roi}%
                  </div>
                  <div className="text-xs text-subtle-gray">ROI</div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Performance Insight */}
      <div className="mt-4 p-3 rounded-lg bg-chart-info/10 border border-chart-info/20">
        <div className="flex items-start gap-2">
          <PieChart className="w-4 h-4 text-chart-info mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-chart-info">Insight de Campañas</div>
            <div className="text-subtle-gray text-xs mt-1">
              Email Marketing tiene el mejor ROI (6329%). Las campañas de Google Search generan más volumen con ROI sólido.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================================================================================
// WEBSITE ANALYTICS COMPONENT
// =====================================================================================

interface WebsiteAnalyticsProps {
  period: string
  loading: boolean
}

function WebsiteAnalyticsWidget({ period, loading }: WebsiteAnalyticsProps) {
  // Mock data de website analytics - En el futuro vendrá de Google Analytics API o similar
  const websiteData: WebsiteAnalyticsData = {
    trafficSources: [
      {
        source: 'Organic Search',
        sessions: 3250,
        percentage: 52.3,
        bounceRate: 34.2,
        avgSessionDuration: 185,
        conversions: 48,
        conversionRate: 1.48
      },
      {
        source: 'Direct',
        sessions: 1850,
        percentage: 29.7,
        bounceRate: 28.1,
        avgSessionDuration: 220,
        conversions: 35,
        conversionRate: 1.89
      },
      {
        source: 'Social Media',
        sessions: 680,
        percentage: 10.9,
        bounceRate: 45.8,
        avgSessionDuration: 142,
        conversions: 12,
        conversionRate: 1.76
      },
      {
        source: 'Paid Search',
        sessions: 285,
        percentage: 4.6,
        bounceRate: 31.5,
        avgSessionDuration: 195,
        conversions: 8,
        conversionRate: 2.81
      },
      {
        source: 'Email',
        sessions: 160,
        percentage: 2.5,
        bounceRate: 22.5,
        avgSessionDuration: 280,
        conversions: 6,
        conversionRate: 3.75
      }
    ],
    topPages: [
      {
        page: '/propiedades',
        title: 'Listado de Propiedades',
        pageviews: 8420,
        uniquePageviews: 6850,
        avgTimeOnPage: 195,
        bounceRate: 42.3,
        exitRate: 35.2,
        conversions: 38
      },
      {
        page: '/',
        title: 'Inicio - Marconi Inmobiliaria',
        pageviews: 6280,
        uniquePageviews: 5120,
        avgTimeOnPage: 125,
        bounceRate: 38.7,
        exitRate: 28.4,
        conversions: 22
      },
      {
        page: '/propiedades/departamentos',
        title: 'Departamentos en Venta',
        pageviews: 4150,
        uniquePageviews: 3420,
        avgTimeOnPage: 210,
        bounceRate: 35.8,
        exitRate: 32.1,
        conversions: 25
      },
      {
        page: '/propiedades/casas',
        title: 'Casas en Venta',
        pageviews: 3680,
        uniquePageviews: 2950,
        avgTimeOnPage: 225,
        bounceRate: 33.2,
        exitRate: 29.8,
        conversions: 18
      },
      {
        page: '/contacto',
        title: 'Contacto',
        pageviews: 2340,
        uniquePageviews: 1890,
        avgTimeOnPage: 95,
        bounceRate: 25.4,
        exitRate: 45.7,
        conversions: 15
      }
    ],
    overallMetrics: {
      totalSessions: 6225,
      totalPageviews: 18750,
      avgSessionDuration: 187,
      bounceRate: 35.8,
      newUsersPercentage: 68.4,
      totalConversions: 109,
      overallConversionRate: 1.75
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="animate-pulse">
              <div className="p-3 rounded-lg bg-surface-darker/30">
                <div className="h-3 bg-surface-darker rounded w-20 mb-2"></div>
                <div className="h-5 bg-surface-darker rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex justify-between items-center p-3 rounded-lg bg-surface-darker/30">
                <div className="h-4 bg-surface-darker rounded w-32"></div>
                <div className="h-4 bg-surface-darker rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg bg-surface-darker/20 border border-border-subtle">
        <div className="text-center">
          <div className="text-sm font-semibold text-chart-primary">
            {websiteData.overallMetrics.totalSessions.toLocaleString()}
          </div>
          <div className="text-xs text-subtle-gray">Sesiones</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-chart-secondary">
            {websiteData.overallMetrics.overallConversionRate}%
          </div>
          <div className="text-xs text-subtle-gray">Conversión</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-chart-tertiary">
            {formatDuration(websiteData.overallMetrics.avgSessionDuration)}
          </div>
          <div className="text-xs text-subtle-gray">Duración</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-chart-quaternary">
            {websiteData.overallMetrics.bounceRate}%
          </div>
          <div className="text-xs text-subtle-gray">Rebote</div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-bone-white mb-2">Fuentes de Tráfico</h4>
        {websiteData.trafficSources.map((source, index) => (
          <div
            key={source.source}
            className="flex items-center justify-between p-3 rounded-lg bg-surface-darker/30 hover:bg-surface-darker/50 transition-colors border border-border-subtle/50"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: index === 0 ? '#4285F4' :
                                   index === 1 ? '#34A853' :
                                   index === 2 ? '#EA4335' :
                                   index === 3 ? '#FBBC05' : '#9AA0A6'
                  }}
                ></div>
                <span className="text-sm font-medium text-white">{source.source}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-subtle-gray">
                <span>{source.sessions.toLocaleString()} sesiones</span>
                <span className="hidden sm:inline">{source.percentage}%</span>
                <span className="hidden md:inline">{source.conversionRate}% conv.</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-chart-success">
                {source.conversions}
              </div>
              <div className="text-xs text-subtle-gray">conversiones</div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Pages */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-bone-white mb-2">Páginas Principales</h4>
        {websiteData.topPages.slice(0, 4).map((page) => (
          <div
            key={page.page}
            className="flex items-center justify-between p-3 rounded-lg bg-surface-darker/30 hover:bg-surface-darker/50 transition-colors border border-border-subtle/50"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white truncate">{page.title}</span>
                <span className="text-xs text-subtle-gray font-mono">{page.page}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-subtle-gray">
                <span>{page.pageviews.toLocaleString()} vistas</span>
                <span className="hidden sm:inline">{formatDuration(page.avgTimeOnPage)}</span>
                <span className="hidden md:inline">{page.bounceRate}% rebote</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-chart-info">
                {page.conversions}
              </div>
              <div className="text-xs text-subtle-gray">conv.</div>
            </div>
          </div>
        ))}
      </div>

      {/* Website Performance Insight */}
      <div className="mt-4 p-3 rounded-lg bg-chart-quaternary/10 border border-chart-quaternary/20">
        <div className="flex items-start gap-2">
          <Eye className="w-4 h-4 text-chart-quaternary mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-chart-quaternary">Insight de Website</div>
            <div className="text-subtle-gray text-xs mt-1">
              Búsqueda orgánica genera 52% del tráfico. La página de propiedades tiene la mejor conversión (38 leads).
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
              Campaign ROI Analysis
            </CardTitle>
            <Badge variant="default" className="text-xs bg-chart-tertiary/20 text-chart-tertiary border-chart-tertiary/30">
              UTM Tracking
            </Badge>
          </CardHeader>
          <CardContent className="widget-content">
            <CampaignROIWidget period={selectedPeriod} loading={dashboardLoading} />
          </CardContent>
        </Card>

        <Card className="widget-container">
          <CardHeader className="widget-header">
            <CardTitle className="widget-title flex items-center gap-2">
              <Eye className="w-5 h-5 text-chart-quaternary" />
              Website Analytics
            </CardTitle>
            <Badge variant="default" className="text-xs bg-chart-quaternary/20 text-chart-quaternary border-chart-quaternary/30">
              Traffic & Engagement
            </Badge>
          </CardHeader>
          <CardContent className="widget-content">
            <WebsiteAnalyticsWidget period={selectedPeriod} loading={dashboardLoading} />
          </CardContent>
        </Card>
      </div>
    </AnalyticsDashboardLayout>
  )
}