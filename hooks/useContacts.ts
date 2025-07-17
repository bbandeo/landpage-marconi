"use client"

import { useState, useEffect } from "react"

export interface Contact {
  id: number
  name: string
  email: string
  phone: string
  message: string
  property: string
  source: string
  status: "new" | "contacted" | "qualified" | "converted"
  priority: "low" | "medium" | "high"
  score: number
  notes?: string
  nextAction?: string
  nextActionDate?: string
  lastContact?: string
  createdAt: string
  updatedAt: string
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/leads")

      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      } else {
        // Mock data for development
        const mockContacts: Contact[] = [
          {
            id: 1,
            name: "María González",
            email: "maria.gonzalez@email.com",
            phone: "+54 11 1234-5678",
            message: "Estoy interesada en el departamento de Palermo. ¿Podríamos coordinar una visita?",
            property: "Departamento en Palermo",
            source: "Sitio Web",
            status: "new",
            priority: "high",
            score: 8,
            notes: "Cliente muy interesada, tiene presupuesto confirmado",
            nextAction: "Llamar para coordinar visita",
            nextActionDate: "2024-01-20T15:00:00Z",
            createdAt: "2024-01-15T10:30:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
          },
          {
            id: 2,
            name: "Juan Pérez",
            email: "juan.perez@email.com",
            phone: "+54 11 9876-5432",
            message: "Hola, me gustaría saber más sobre la casa en Belgrano que vi en su página.",
            property: "Casa en Belgrano",
            source: "Facebook",
            status: "contacted",
            priority: "medium",
            score: 6,
            notes: "Contactado por teléfono, solicita más información",
            lastContact: "2024-01-16T14:20:00Z",
            createdAt: "2024-01-14T16:45:00Z",
            updatedAt: "2024-01-16T14:20:00Z",
          },
          {
            id: 3,
            name: "Ana Rodríguez",
            email: "ana.rodriguez@email.com",
            phone: "+54 11 5555-1234",
            message: "Busco un departamento para alquilar en zona norte. Presupuesto hasta $800 USD.",
            property: "Departamento Zona Norte",
            source: "WhatsApp",
            status: "qualified",
            priority: "high",
            score: 9,
            notes: "Cliente calificada, presupuesto confirmado, busca mudarse en febrero",
            nextAction: "Enviar opciones disponibles",
            nextActionDate: "2024-01-18T10:00:00Z",
            createdAt: "2024-01-12T09:15:00Z",
            updatedAt: "2024-01-17T11:30:00Z",
          },
          {
            id: 4,
            name: "Carlos Martínez",
            email: "carlos.martinez@email.com",
            phone: "+54 11 7777-8888",
            message: "Firmé el contrato de alquiler del departamento en Centro. ¡Muchas gracias por todo!",
            property: "Departamento en Centro",
            source: "Referido",
            status: "converted",
            priority: "low",
            score: 10,
            notes: "Cliente convertido - Contrato firmado el 15/01/2024",
            lastContact: "2024-01-15T16:00:00Z",
            createdAt: "2024-01-05T14:20:00Z",
            updatedAt: "2024-01-15T16:00:00Z",
          },
        ]
        setContacts(mockContacts)
      }
    } catch (err) {
      setError("Error al cargar los contactos")
      console.error("Error fetching contacts:", err)
    } finally {
      setLoading(false)
    }
  }

  const updateContact = async (id: number, updates: Partial<Contact>) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updatedContact = await response.json()
        setContacts((prev) => prev.map((contact) => (contact.id === id ? { ...contact, ...updatedContact } : contact)))
      } else {
        // Mock update for development
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === id ? { ...contact, ...updates, updatedAt: new Date().toISOString() } : contact,
          ),
        )
      }
    } catch (err) {
      console.error("Error updating contact:", err)
      throw new Error("No se pudo actualizar el contacto")
    }
  }

  const deleteContact = async (id: number) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setContacts((prev) => prev.filter((contact) => contact.id !== id))
      } else {
        throw new Error("Error al eliminar el contacto")
      }
    } catch (err) {
      console.error("Error deleting contact:", err)
      throw new Error("No se pudo eliminar el contacto")
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return {
    contacts,
    loading,
    error,
    updateContact,
    deleteContact,
    refetch: fetchContacts,
  }
}
