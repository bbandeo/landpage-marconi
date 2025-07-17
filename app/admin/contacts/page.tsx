"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, Filter, Download, Grid, List } from "lucide-react"
import { useContacts } from "@/hooks/useContacts"
import { useContactFilters } from "@/hooks/useContactFilters"
import ContactDetailModal from "@/components/admin/ContactDetailModal"
import ContactKanban from "@/components/admin/ContactKanban"
import type { Contact } from "@/hooks/useContacts"

export default function ContactsPage() {
  const { contacts, loading, updateContact } = useContacts()
  const { filters, filteredContacts, updateFilter, clearFilters, getFilterStats } = useContactFilters(contacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban")

  const stats = getFilterStats()

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedContact(null)
  }

  const exportContacts = () => {
    const csvContent = [
      ["Nombre", "Email", "Teléfono", "Propiedad", "Estado", "Prioridad", "Fuente", "Fecha"],
      ...filteredContacts.map((contact) => [
        contact.name,
        contact.email,
        contact.phone,
        contact.property,
        contact.status,
        contact.priority,
        contact.source,
        new Date(contact.createdAt).toLocaleDateString("es-AR"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contactos.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>

        <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contactos</h1>
          <p className="text-gray-600">Gestiona tus leads y consultas</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportContacts}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "kanban" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("kanban")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nuevos</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Nuevo</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contactados</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.contacted}</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">En proceso</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calificados</p>
                <p className="text-2xl font-bold text-purple-600">{stats.qualified}</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Calificado</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Convertidos</p>
                <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Convertido</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </CardTitle>
          <CardDescription>Filtra y busca contactos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar contactos..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="new">Nuevos</SelectItem>
                <SelectItem value="contacted">Contactados</SelectItem>
                <SelectItem value="qualified">Calificados</SelectItem>
                <SelectItem value="converted">Convertidos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.priority} onValueChange={(value) => updateFilter("priority", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.source} onValueChange={(value) => updateFilter("source", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Fuente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las fuentes</SelectItem>
                <SelectItem value="Sitio Web">Sitio Web</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Referido">Referido</SelectItem>
                <SelectItem value="Llamada">Llamada</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "kanban" | "list")}>
        <TabsList className="hidden">
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban">
          <ContactKanban
            contacts={filteredContacts}
            onContactUpdate={updateContact}
            onContactClick={handleContactClick}
          />
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Contactos</CardTitle>
              <CardDescription>{filteredContacts.length} contactos encontrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{contact.name}</h3>
                          <Badge
                            variant={
                              contact.status === "new"
                                ? "default"
                                : contact.status === "converted"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {contact.status === "new"
                              ? "Nuevo"
                              : contact.status === "contacted"
                                ? "Contactado"
                                : contact.status === "qualified"
                                  ? "Calificado"
                                  : "Convertido"}
                          </Badge>
                          <Badge
                            variant={contact.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {contact.priority === "high" ? "Alta" : contact.priority === "medium" ? "Media" : "Baja"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div>📧 {contact.email}</div>
                          <div>📱 {contact.phone}</div>
                          <div>🏠 {contact.property}</div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{contact.message}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{contact.source}</div>
                        <div>{new Date(contact.createdAt).toLocaleDateString("es-AR")}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Detail Modal */}
      <ContactDetailModal
        contact={selectedContact}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUpdate={updateContact}
      />
    </div>
  )
}
