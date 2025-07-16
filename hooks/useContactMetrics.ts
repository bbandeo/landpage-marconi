"use client"

import { useMemo } from "react"
import type { Contact } from "./useContacts"

export function useContactMetrics(contacts: Contact[]) {
  const metrics = useMemo(() => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Basic counts
    const totalContacts = contacts.length
    const newContacts = contacts.filter((c) => c.status === "new").length
    const contactedContacts = contacts.filter((c) => c.status === "contacted").length
    const qualifiedContacts = contacts.filter((c) => c.status === "qualified").length
    const convertedContacts = contacts.filter((c) => c.status === "converted").length

    // Time-based metrics
    const contactsThisWeek = contacts.filter((c) => new Date(c.createdAt) >= weekAgo).length
    const contactsThisMonth = contacts.filter((c) => new Date(c.createdAt) >= monthAgo).length

    // Conversion rate
    const conversionRate = totalContacts > 0 ? (convertedContacts / totalContacts) * 100 : 0

    // Source analysis
    const sourceStats = contacts.reduce(
      (acc, contact) => {
        acc[contact.source] = (acc[contact.source] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Priority distribution
    const priorityStats = contacts.reduce(
      (acc, contact) => {
        acc[contact.priority] = (acc[contact.priority] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Average score
    const averageScore = contacts.length > 0 ? contacts.reduce((sum, c) => sum + c.score, 0) / contacts.length : 0

    // Overdue actions
    const overdueActions = contacts.filter((c) => {
      if (!c.nextActionDate) return false
      return new Date(c.nextActionDate) < now
    }).length

    // Weekly conversion data for chart
    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dayContacts = contacts.filter((c) => {
        const contactDate = new Date(c.createdAt)
        return contactDate.toDateString() === date.toDateString()
      })
      const dayConverted = dayContacts.filter((c) => c.status === "converted").length

      return {
        date: date.toLocaleDateString("es-AR", { weekday: "short" }),
        contacts: dayContacts.length,
        converted: dayConverted,
      }
    }).reverse()

    return {
      totalContacts,
      newContacts,
      contactedContacts,
      qualifiedContacts,
      convertedContacts,
      contactsThisWeek,
      contactsThisMonth,
      conversionRate,
      sourceStats,
      priorityStats,
      averageScore,
      overdueActions,
      weeklyData,
    }
  }, [contacts])

  return metrics
}
