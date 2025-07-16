"use client"

import { useState, useEffect } from "react"

export interface Contact {
  id: number
  name: string
  email: string
  phone: string
  message: string
  property: string
  status: "new" | "contacted" | "qualified" | "converted"
  source: string
  createdAt: string
  notes?: string
  lastContact?: string
  nextAction?: string
  nextActionDate?: string
  priority: "low" | "medium" | "high"
  score: number
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/leads")
      if (!response.ok) throw new Error("Failed to fetch contacts")
      const data = await response.json()
      setContacts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const updateContact = async (id: number, updates: Partial<Contact>) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error("Failed to update contact")

      const updatedContact = await response.json()
      setContacts((prev) => prev.map((contact) => (contact.id === id ? { ...contact, ...updatedContact } : contact)))

      return updatedContact
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      throw err
    }
  }

  const deleteContact = async (id: number) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete contact")

      setContacts((prev) => prev.filter((contact) => contact.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      throw err
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    updateContact,
    deleteContact,
  }
}
