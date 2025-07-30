"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { Property, Lead } from "@/lib/types"

export interface RealtimeConfig {
  table: string
  event?: "INSERT" | "UPDATE" | "DELETE" | "*"
  filter?: string
}

/**
 * Generic realtime hook for Supabase subscriptions
 */
export function useRealtime<T>(config: RealtimeConfig, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const { table, event = "*", filter } = config

    const subscription = supabase
      .channel(`realtime-${table}`)
      .on(
        "postgres_changes",
        {
          event,
          schema: "public",
          table,
          filter,
        },
        (payload) => {
          console.log("Realtime update:", payload)

          switch (payload.eventType) {
            case "INSERT":
              setData((prev) => [...prev, payload.new as T])
              break
            case "UPDATE":
              setData((prev) =>
                prev.map((item) => ((item as any).id === (payload.new as any).id ? (payload.new as T) : item)),
              )
              break
            case "DELETE":
              setData((prev) => prev.filter((item) => (item as any).id !== (payload.old as any).id))
              break
          }
        },
      )
      .subscribe((status) => {
        console.log("Subscription status:", status)
        if (status === "SUBSCRIBED") {
          setLoading(false)
          setError(null)
        } else if (status === "CHANNEL_ERROR") {
          setError("Failed to connect to realtime updates")
          setLoading(false)
        }
      })

    setLoading(true)

    return () => {
      subscription.unsubscribe()
    }
  }, [config]) // Updated to use the entire config object as a dependency

  return { data, setData, loading, error }
}

/**
 * Hook for real-time property updates
 */
export const useRealtimeProperties = (initialProperties: Property[] = []) => {
  return useRealtime<Property>(
    {
      table: "properties",
      event: "*",
    },
    initialProperties,
  )
}

/**
 * Hook for real-time lead updates
 */
export const useRealtimeLeads = (initialLeads: Lead[] = []) => {
  return useRealtime<Lead>(
    {
      table: "leads",
      event: "*",
    },
    initialLeads,
  )
}

/**
 * Hook for real-time notifications
 */
export const useRealtimeNotifications = () => {
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      type: "property" | "lead" | "general"
      title: string
      message: string
      timestamp: string
      read: boolean
    }>
  >([])

  useEffect(() => {
    // Subscribe to both properties and leads for notifications
    const propertiesSubscription = supabase
      .channel("notifications-properties")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "properties",
        },
        (payload) => {
          const notification = {
            id: `property-${payload.new?.id || payload.old?.id}-${Date.now()}`,
            type: "property" as const,
            title: getPropertyNotificationTitle(payload.eventType),
            message: getPropertyNotificationMessage(payload.eventType, payload.new?.title || payload.old?.title),
            timestamp: new Date().toISOString(),
            read: false,
          }

          setNotifications((prev) => [notification, ...prev.slice(0, 49)]) // Keep last 50
        },
      )
      .subscribe()

    const leadsSubscription = supabase
      .channel("notifications-leads")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          const notification = {
            id: `lead-${payload.new?.id || payload.old?.id}-${Date.now()}`,
            type: "lead" as const,
            title: getLeadNotificationTitle(payload.eventType),
            message: getLeadNotificationMessage(payload.eventType, payload.new?.name || payload.old?.name),
            timestamp: new Date().toISOString(),
            read: false,
          }

          setNotifications((prev) => [notification, ...prev.slice(0, 49)]) // Keep last 50
        },
      )
      .subscribe()

    return () => {
      propertiesSubscription.unsubscribe()
      leadsSubscription.unsubscribe()
    }
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  }
}

// Helper functions for notification messages
const getPropertyNotificationTitle = (eventType: string): string => {
  switch (eventType) {
    case "INSERT":
      return "Nueva Propiedad"
    case "UPDATE":
      return "Propiedad Actualizada"
    case "DELETE":
      return "Propiedad Eliminada"
    default:
      return "Propiedad"
  }
}

const getPropertyNotificationMessage = (eventType: string, title?: string): string => {
  const propertyName = title ? `"${title}"` : "Una propiedad"

  switch (eventType) {
    case "INSERT":
      return `${propertyName} ha sido agregada al sistema`
    case "UPDATE":
      return `${propertyName} ha sido actualizada`
    case "DELETE":
      return `${propertyName} ha sido eliminada`
    default:
      return `${propertyName} ha sido modificada`
  }
}

const getLeadNotificationTitle = (eventType: string): string => {
  switch (eventType) {
    case "INSERT":
      return "Nuevo Lead"
    case "UPDATE":
      return "Lead Actualizado"
    case "DELETE":
      return "Lead Eliminado"
    default:
      return "Lead"
  }
}

const getLeadNotificationMessage = (eventType: string, name?: string): string => {
  const leadName = name ? `"${name}"` : "Un lead"

  switch (eventType) {
    case "INSERT":
      return `Nuevo lead de ${leadName}`
    case "UPDATE":
      return `Lead de ${leadName} ha sido actualizado`
    case "DELETE":
      return `Lead de ${leadName} ha sido eliminado`
    default:
      return `Lead de ${leadName} ha sido modificado`
  }
}
