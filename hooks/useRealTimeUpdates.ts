"use client"

// =====================================================================================
// MARCONI INMOBILIARIA - REAL-TIME UPDATES HOOK
// =====================================================================================
// Hook especializado para updates en tiempo real del dashboard
// Incluye polling optimizado, WebSocket support y notifications
// =====================================================================================

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState, useCallback } from 'react'
import { queryKeys, cacheStrategies, invalidateQueries } from '@/lib/react-query-config'

// =====================================================================================
// TYPES
// =====================================================================================

export interface RealTimeMetrics {
  activeUsers: number
  currentViews: number
  todayLeads: number
  lastHourViews: number
  topActiveProperties: Array<{
    id: number
    title: string
    currentViews: number
    todayLeads: number
  }>
  recentEvents: Array<{
    id: string
    type: 'view' | 'lead' | 'interaction'
    propertyId: number
    propertyTitle: string
    timestamp: string
    deviceType: string
    source?: string
  }>
  systemStatus: {
    isHealthy: boolean
    responseTime: number
    errorRate: number
  }
}

export interface UseRealTimeOptions {
  enabled?: boolean
  interval?: number
  maxEvents?: number
  enableNotifications?: boolean
  enableWebSocket?: boolean
}

export interface RealTimeEvent {
  id: string
  type: 'view' | 'lead' | 'interaction' | 'system'
  data: any
  timestamp: string
}

// =====================================================================================
// MAIN REAL-TIME HOOK
// =====================================================================================

export function useRealTimeUpdates(options: UseRealTimeOptions = {}) {
  const {
    enabled = true,
    interval = 30000, // 30 seconds
    maxEvents = 50,
    enableNotifications = false,
    enableWebSocket = false,
  } = options

  const queryClient = useQueryClient()
  const [events, setEvents] = useState<RealTimeEvent[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const notificationPermission = useRef<NotificationPermission>('default')

  // Main real-time data query
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: queryKeys.realtime.active(),
    queryFn: async (): Promise<RealTimeMetrics> => {
      const response = await fetch('/api/analytics/realtime/active')

      if (!response.ok) {
        throw new Error(`Real-time data fetch failed: ${response.status}`)
      }

      const rawData = await response.json()

      if (!rawData.success) {
        throw new Error(rawData.error || 'Real-time data fetch failed')
      }

      return transformRealTimeMetrics(rawData.data)
    },

    ...cacheStrategies.realtime,
    enabled,
    refetchInterval: interval,
    refetchOnWindowFocus: true,
    throwOnError: false,
  })

  // =====================================================================================
  // WEBSOCKET CONNECTION
  // =====================================================================================

  const connectWebSocket = useCallback(() => {
    if (!enableWebSocket || typeof window === 'undefined') return

    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      const wsUrl = `${protocol}//${window.location.host}/api/analytics/realtime/ws`

      wsRef.current = new WebSocket(wsUrl)

      wsRef.current.onopen = () => {
        setIsConnected(true)
        console.log('Real-time WebSocket connected')
      }

      wsRef.current.onmessage = (event) => {
        try {
          const eventData: RealTimeEvent = JSON.parse(event.data)
          handleRealTimeEvent(eventData)
        } catch (error) {
          console.warn('Failed to parse WebSocket message:', error)
        }
      }

      wsRef.current.onclose = () => {
        setIsConnected(false)
        console.log('Real-time WebSocket disconnected')

        // Attempt reconnection after 5 seconds
        setTimeout(() => {
          if (enabled && enableWebSocket) {
            connectWebSocket()
          }
        }, 5000)
      }

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
      }

    } catch (error) {
      console.error('Failed to connect WebSocket:', error)
      setIsConnected(false)
    }
  }, [enableWebSocket, enabled])

  // =====================================================================================
  // EVENT HANDLING
  // =====================================================================================

  const handleRealTimeEvent = useCallback((event: RealTimeEvent) => {
    // Add to events list
    setEvents(prev => {
      const newEvents = [event, ...prev].slice(0, maxEvents)
      return newEvents
    })

    // Handle different event types
    switch (event.type) {
      case 'view':
        // Invalidate property metrics for the viewed property
        if (event.data.propertyId) {
          queryClient.invalidateQueries({
            queryKey: ['properties', 'metrics', event.data.propertyId]
          })
        }
        break

      case 'lead':
        // Invalidate lead analytics
        invalidateQueries.leadAnalytics()

        // Show notification if enabled
        if (enableNotifications && event.data.propertyTitle) {
          showNotification(
            'Nuevo Lead Generado',
            `Lead desde ${event.data.propertyTitle}`,
            'success'
          )
        }
        break

      case 'interaction':
        // Update interaction metrics
        break

      case 'system':
        // Handle system events
        if (event.data.type === 'error' && enableNotifications) {
          showNotification(
            'Error del Sistema',
            event.data.message,
            'error'
          )
        }
        break
    }

    // Invalidate real-time data to trigger refetch
    queryClient.invalidateQueries({
      queryKey: queryKeys.realtime.active()
    })
  }, [maxEvents, queryClient, enableNotifications])

  // =====================================================================================
  // NOTIFICATIONS
  // =====================================================================================

  const requestNotificationPermission = useCallback(async () => {
    if (!enableNotifications || typeof window === 'undefined' || !('Notification' in window)) {
      return false
    }

    if (Notification.permission === 'granted') {
      notificationPermission.current = 'granted'
      return true
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      notificationPermission.current = permission
      return permission === 'granted'
    }

    return false
  }, [enableNotifications])

  const showNotification = useCallback(
    (title: string, body: string, type: 'success' | 'error' | 'info' = 'info') => {
      if (notificationPermission.current !== 'granted') return

      const notification = new Notification(title, {
        body,
        icon: type === 'success' ? '/icons/success.png' :
              type === 'error' ? '/icons/error.png' : '/icons/info.png',
        badge: '/icons/badge.png',
        tag: type,
        requireInteraction: type === 'error',
      })

      // Auto-close after 5 seconds for non-error notifications
      if (type !== 'error') {
        setTimeout(() => notification.close(), 5000)
      }
    },
    []
  )

  // =====================================================================================
  // LIFECYCLE EFFECTS
  // =====================================================================================

  // Setup WebSocket connection
  useEffect(() => {
    if (enabled && enableWebSocket) {
      connectWebSocket()
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }, [enabled, enableWebSocket, connectWebSocket])

  // Setup notifications
  useEffect(() => {
    if (enableNotifications) {
      requestNotificationPermission()
    }
  }, [enableNotifications, requestNotificationPermission])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  // =====================================================================================
  // UTILITY FUNCTIONS
  // =====================================================================================

  const invalidateAllData = useCallback(() => {
    invalidateQueries.allAnalytics()
    invalidateQueries.propertyMetrics()
    invalidateQueries.leadAnalytics()
  }, [])

  const clearEvents = useCallback(() => {
    setEvents([])
  }, [])

  const getEventsByType = useCallback((type: RealTimeEvent['type']) => {
    return events.filter(event => event.type === type)
  }, [events])

  const getRecentEvents = useCallback((minutes: number = 5) => {
    const cutoff = Date.now() - (minutes * 60 * 1000)
    return events.filter(event => new Date(event.timestamp).getTime() > cutoff)
  }, [events])

  // =====================================================================================
  // RETURN VALUES
  // =====================================================================================

  return {
    // Data
    data,
    metrics: data,
    events,
    recentEvents: data?.recentEvents || [],

    // Connection status
    isConnected: enableWebSocket ? isConnected : true, // Always true for polling
    isPolling: !enableWebSocket,
    isWebSocket: enableWebSocket && isConnected,

    // Query states
    isLoading,
    isError,
    error,
    isRefetching,

    // Actions
    refetch,
    invalidateAllData,
    clearEvents,

    // Event utilities
    getEventsByType,
    getRecentEvents,

    // Notifications
    notificationPermission: notificationPermission.current,
    requestNotificationPermission,
    showNotification,

    // Configuration
    interval,
    maxEvents,
    enabled,
  }
}

// =====================================================================================
// SPECIALIZED HOOKS
// =====================================================================================

// Hook for monitoring active users only
export function useActiveUsers() {
  const { data, isLoading, refetch } = useRealTimeUpdates({
    enabled: true,
    interval: 15000, // 15 seconds
    enableWebSocket: false,
    enableNotifications: false,
  })

  return {
    activeUsers: data?.activeUsers || 0,
    currentViews: data?.currentViews || 0,
    isLoading,
    refetch,
  }
}

// Hook for lead notifications only
export function useLeadNotifications() {
  const { events, showNotification, requestNotificationPermission } = useRealTimeUpdates({
    enabled: true,
    enableNotifications: true,
    enableWebSocket: true,
    maxEvents: 10,
  })

  const leadEvents = events.filter(event => event.type === 'lead')

  return {
    leadEvents,
    showNotification,
    requestNotificationPermission,
    hasNewLeads: leadEvents.length > 0,
  }
}

// =====================================================================================
// HELPER FUNCTIONS
// =====================================================================================

function transformRealTimeMetrics(rawData: any): RealTimeMetrics {
  return {
    activeUsers: rawData.active_users || 0,
    currentViews: rawData.current_views || 0,
    todayLeads: rawData.today_leads || 0,
    lastHourViews: rawData.last_hour_views || 0,
    topActiveProperties: rawData.top_active_properties || [],
    recentEvents: rawData.recent_events || [],
    systemStatus: {
      isHealthy: rawData.system_status?.is_healthy ?? true,
      responseTime: rawData.system_status?.response_time || 0,
      errorRate: rawData.system_status?.error_rate || 0,
    },
  }
}

// =====================================================================================
// EXPORTS
// =====================================================================================

export default useRealTimeUpdates
export type {
  RealTimeMetrics,
  UseRealTimeOptions,
  RealTimeEvent,
}