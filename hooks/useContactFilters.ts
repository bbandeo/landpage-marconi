"use client"

import { useState, useMemo } from "react"
import type { Contact } from "./useContacts"

export interface ContactFilters {
  search: string
  status: string
  priority: string
  source: string
  dateRange: {
    from?: Date
    to?: Date
  }
}

export function useContactFilters(contacts: Contact[]) {
  const [filters, setFilters] = useState<ContactFilters>({
    search: "",
    status: "all",
    priority: "all",
    source: "all",
    dateRange: {},
  })

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesSearch =
          contact.name.toLowerCase().includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm) ||
          contact.phone.includes(searchTerm) ||
          contact.property.toLowerCase().includes(searchTerm) ||
          contact.message.toLowerCase().includes(searchTerm)

        if (!matchesSearch) return false
      }

      // Status filter
      if (filters.status !== "all" && contact.status !== filters.status) {
        return false
      }

      // Priority filter
      if (filters.priority !== "all" && contact.priority !== filters.priority) {
        return false
      }

      // Source filter
      if (filters.source !== "all" && contact.source !== filters.source) {
        return false
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const contactDate = new Date(contact.createdAt)

        if (filters.dateRange.from && contactDate < filters.dateRange.from) {
          return false
        }

        if (filters.dateRange.to && contactDate > filters.dateRange.to) {
          return false
        }
      }

      return true
    })
  }, [contacts, filters])

  const updateFilter = (key: keyof ContactFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      priority: "all",
      source: "all",
      dateRange: {},
    })
  }

  const getFilterStats = () => {
    return {
      total: contacts.length,
      filtered: filteredContacts.length,
      new: filteredContacts.filter((c) => c.status === "new").length,
      contacted: filteredContacts.filter((c) => c.status === "contacted").length,
      qualified: filteredContacts.filter((c) => c.status === "qualified").length,
      converted: filteredContacts.filter((c) => c.status === "converted").length,
      highPriority: filteredContacts.filter((c) => c.priority === "high").length,
    }
  }

  return {
    filters,
    filteredContacts,
    updateFilter,
    clearFilters,
    getFilterStats,
  }
}
