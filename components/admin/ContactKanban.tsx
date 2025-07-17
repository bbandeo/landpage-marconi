"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, MessageCircle, Calendar, Star, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Contact } from "@/hooks/useContacts"
import { useContactActions } from "@/hooks/useContactActions"

interface ContactKanbanProps {
  contacts: Contact[]
  onContactUpdate: (id: number, updates: Partial<Contact>) => Promise<void>
  onContactClick: (contact: Contact) => void
}

const COLUMNS = [
  { id: "new", title: "Nuevos", color: "bg-blue-100 border-blue-200" },
  { id: "contacted", title: "Contactados", color: "bg-yellow-100 border-yellow-200" },
  { id: "qualified", title: "Calificados", color: "bg-purple-100 border-purple-200" },
  { id: "converted", title: "Convertidos", color: "bg-green-100 border-green-200" },
]

export default function ContactKanban({ contacts, onContactUpdate, onContactClick }: ContactKanbanProps) {
  const [contactsState, setContactsState] = useState(contacts)
  const { openWhatsApp, openEmail, callContact } = useContactActions()

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result
    const contactId = Number.parseInt(draggableId)
    const newStatus = destination.droppableId as Contact["status"]

    // Update local state immediately for better UX
    setContactsState((prev) =>
      prev.map((contact) => (contact.id === contactId ? { ...contact, status: newStatus } : contact)),
    )

    try {
      await onContactUpdate(contactId, { status: newStatus })
    } catch (error) {
      console.error("Error updating contact status:", error)
      // Revert local state on error
      setContactsState(contacts)
    }
  }

  const getContactsByStatus = (status: string) => {
    return contactsState.filter((contact) => contact.status === status)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  const getScoreStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(score / 2) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLUMNS.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className={`p-4 rounded-lg ${column.color}`}>
              <h3 className="font-semibold text-lg">{column.title}</h3>
              <p className="text-sm text-gray-600">{getContactsByStatus(column.id).length} contactos</p>
            </div>

            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] space-y-3 p-2 rounded-lg transition-colors ${
                    snapshot.isDraggingOver ? "bg-gray-50" : ""
                  }`}
                >
                  {getContactsByStatus(column.id).map((contact, index) => (
                    <Draggable key={contact.id} draggableId={contact.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`cursor-pointer transition-shadow hover:shadow-md border-l-4 ${getPriorityColor(
                            contact.priority,
                          )} ${snapshot.isDragging ? "shadow-lg rotate-2" : ""}`}
                          onClick={() => onContactClick(contact)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`} />
                                  <AvatarFallback>
                                    {contact.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-sm font-medium">{contact.name}</CardTitle>
                                  <p className="text-xs text-gray-500">{contact.email}</p>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      callContact(contact)
                                    }}
                                  >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Llamar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      openEmail(contact)
                                    }}
                                  >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      openWhatsApp(contact)
                                    }}
                                  >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    WhatsApp
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                  {contact.property}
                                </Badge>
                                <div className="flex items-center">{getScoreStars(contact.score)}</div>
                              </div>

                              <p className="text-xs text-gray-600 line-clamp-2">{contact.message}</p>

                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{contact.source}</span>
                                <span>{new Date(contact.createdAt).toLocaleDateString("es-AR")}</span>
                              </div>

                              {contact.nextAction && (
                                <div className="flex items-center text-xs text-orange-600 bg-orange-50 p-1 rounded">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  <span className="truncate">{contact.nextAction}</span>
                                </div>
                              )}

                              <div className="flex items-center justify-between pt-2">
                                <Badge
                                  variant={contact.priority === "high" ? "destructive" : "secondary"}
                                  className="text-xs"
                                >
                                  {contact.priority === "high"
                                    ? "Alta"
                                    : contact.priority === "medium"
                                      ? "Media"
                                      : "Baja"}
                                </Badge>
                                <div className="flex space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      callContact(contact)
                                    }}
                                  >
                                    <Phone className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      openWhatsApp(contact)
                                    }}
                                  >
                                    <MessageCircle className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
