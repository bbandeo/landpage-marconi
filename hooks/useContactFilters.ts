"use client"

import { useState, useMemo } from "react"
import type { Contact } from "./useContacts"

export function useContactFilters(contacts: Contact[]) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)

      const matchesStatus = statusFilter === "all" || contact.status === statusFilter
      const matchesSource = sourceFilter === "all" || contact.source === sourceFilter
      const matchesPriority = priorityFilter === "all" || contact.priority === priorityFilter

      let matchesDate = true
      if (dateFilter !== "all") {
        const contactDate = new Date(contact.createdAt)
        const now = new Date()

        switch (dateFilter) {
          case "today":
            matchesDate = contactDate.toDateString() === now.toDateString()
            break
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            matchesDate = contactDate >= weekAgo
            break
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            matchesDate = contactDate >= monthAgo
            break
        }
      }

      return matchesSearch && matchesStatus && matchesSource && matchesPriority && matchesDate
    })
  }, [contacts, searchTerm, statusFilter, sourceFilter, priorityFilter, dateFilter])

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sourceFilter,
    setSourceFilter,
    priorityFilter,
    setPriorityFilter,
    dateFilter,
    setDateFilter,
    filteredContacts,
  }
}
