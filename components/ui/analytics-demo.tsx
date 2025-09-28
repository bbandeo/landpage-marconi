/**
 * COMPONENTE DE DEMOSTRACIÓN - DESIGN TOKENS PARA ANALYTICS
 *
 * Este componente demuestra todos los design tokens implementados para el sistema de analytics.
 * No usar en producción - solo para validación y referencia del design system.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Eye, Users, Target, AlertCircle } from "lucide-react"

export function AnalyticsDemo() {
  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-bone-white mb-4">
          Design Tokens para Analytics - Demo
        </h1>
        <p className="text-support-gray">
          Demostración de todos los tokens implementados para data visualization
        </p>
      </div>

      {/* COLORES PARA CHARTS */}
      <Card className="widget-container">
        <CardHeader>
          <CardTitle className="widget-title">Paleta de Colores para Charts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-primary rounded-lg"></div>
              <p className="text-data-xs text-center">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-secondary rounded-lg"></div>
              <p className="text-data-xs text-center">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-tertiary rounded-lg"></div>
              <p className="text-data-xs text-center">Tertiary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-quaternary rounded-lg"></div>
              <p className="text-data-xs text-center">Quaternary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-warning rounded-lg"></div>
              <p className="text-data-xs text-center">Warning</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-danger rounded-lg"></div>
              <p className="text-data-xs text-center">Danger</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-neutral rounded-lg"></div>
              <p className="text-data-xs text-center">Neutral</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-chart-info rounded-lg"></div>
              <p className="text-data-xs text-center">Info</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WIDGETS KPI */}
      <div className="analytics-grid">
        <Card className="widget-container">
          <CardContent className="widget-content">
            <div className="widget-header">
              <Eye className="w-6 h-6 text-chart-primary" />
            </div>
            <div className="space-y-2">
              <p className="kpi-label">Total Views</p>
              <p className="kpi-number-large">1,234,567</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-trend-positive" />
                <span className="text-data-xs text-trend-positive">+12.5% vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget-container">
          <CardContent className="widget-content">
            <div className="widget-header">
              <Users className="w-6 h-6 text-chart-secondary" />
            </div>
            <div className="space-y-2">
              <p className="kpi-label">Unique Visitors</p>
              <p className="kpi-number">89,456</p>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-trend-negative" />
                <span className="text-data-xs text-trend-negative">-3.2% vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget-container">
          <CardContent className="widget-content">
            <div className="widget-header">
              <Target className="w-6 h-6 text-chart-tertiary" />
            </div>
            <div className="space-y-2">
              <p className="kpi-label">Conversion Rate</p>
              <p className="kpi-number">3.47%</p>
              <div className="flex items-center gap-2">
                <span className="text-data-xs text-trend-neutral">→ No change</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="widget-container">
          <CardContent className="widget-content">
            <div className="widget-header">
              <AlertCircle className="w-6 h-6 text-chart-warning" />
            </div>
            <div className="space-y-2">
              <p className="kpi-label">Bounce Rate</p>
              <p className="kpi-number">65.2%</p>
              <div className="flex items-center gap-2">
                <span className="text-data-xs text-trend-positive">Improved</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* STATUS INDICATORS */}
      <Card className="widget-container">
        <CardHeader>
          <CardTitle className="widget-title">Status Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <span className="status-success">Success</span>
            <span className="status-warning">Warning</span>
            <span className="status-error">Error</span>
            <span className="status-info">Info</span>
            <span className="status-neutral">Neutral</span>
          </div>
        </CardContent>
      </Card>

      {/* TYPOGRAPHY SCALE */}
      <Card className="widget-container">
        <CardHeader>
          <CardTitle className="widget-title">Typography Scale for Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-data-xxl font-mono">48px - Data XXL</p>
            <p className="text-data-xs text-subtle-gray">font-mono, weight-800</p>
          </div>
          <div>
            <p className="text-data-xl font-mono">40px - Data XL</p>
            <p className="text-data-xs text-subtle-gray">font-mono, weight-700</p>
          </div>
          <div>
            <p className="text-data-lg font-data">28px - Data LG</p>
            <p className="text-data-xs text-subtle-gray">font-data, weight-600</p>
          </div>
          <div>
            <p className="text-data-md font-data">20px - Data MD</p>
            <p className="text-data-xs text-subtle-gray">font-data, weight-500</p>
          </div>
          <div>
            <p className="text-data-sm font-data">14px - Data SM</p>
            <p className="text-data-xs text-subtle-gray">font-data, weight-400</p>
          </div>
          <div>
            <p className="text-data-xs font-data">12px - Data XS</p>
            <p className="text-data-xs text-subtle-gray">font-data, weight-400</p>
          </div>
          <div>
            <p className="text-data-xxs font-data">10px - Data XXS</p>
            <p className="text-data-xs text-subtle-gray">font-data, weight-400</p>
          </div>
        </CardContent>
      </Card>

      {/* SPACING TOKENS */}
      <Card className="widget-container">
        <CardHeader>
          <CardTitle className="widget-title">Spacing Tokens for Widgets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-data-sm text-bone-white">Widget Padding Options:</p>
            <div className="bg-chart-primary/20 p-widget-xs border border-chart-primary/30 rounded">
              <p className="text-data-xs">widget-xs (12px)</p>
            </div>
            <div className="bg-chart-secondary/20 p-widget-sm border border-chart-secondary/30 rounded">
              <p className="text-data-xs">widget-sm (16px)</p>
            </div>
            <div className="bg-chart-tertiary/20 p-widget-md border border-chart-tertiary/30 rounded">
              <p className="text-data-xs">widget-md (24px)</p>
            </div>
            <div className="bg-chart-quaternary/20 p-widget-lg border border-chart-quaternary/30 rounded">
              <p className="text-data-xs">widget-lg (32px)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LOADING STATES */}
      <Card className="widget-container">
        <CardHeader>
          <CardTitle className="widget-title">Loading States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="analytics-skeleton h-8"></div>
            <div className="analytics-skeleton h-6 w-3/4"></div>
            <div className="analytics-skeleton h-4 w-1/2"></div>
            <div className="flex gap-2">
              <div className="analytics-skeleton-number"></div>
              <div className="analytics-skeleton-text flex-1"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ACCESSIBILITY FEATURES */}
      <Card className="widget-container">
        <CardHeader>
          <CardTitle className="widget-title">Accessibility Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-data-sm text-bone-white">
              ✅ WCAG AA compliant color contrast
            </p>
            <p className="text-data-sm text-bone-white">
              ✅ Focus states for keyboard navigation
            </p>
            <p className="text-data-sm text-bone-white">
              ✅ High contrast mode support
            </p>
            <p className="text-data-sm text-bone-white">
              ✅ Reduced motion support
            </p>
            <div className="analytics-focus-visible p-3 bg-chart-primary/20 rounded border border-chart-primary/30">
              <p className="text-data-xs">Try tabbing to this element to see focus state</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsDemo