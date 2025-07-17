"use client"

import type { Contact } from "./useContacts"

export function useContactActions() {
  const callContact = (contact: Contact) => {
    const phoneNumber = contact.phone.replace(/\D/g, "")
    window.open(`tel:${phoneNumber}`, "_self")
  }

  const openEmail = (contact: Contact) => {
    const subject = encodeURIComponent(`Consulta sobre ${contact.property}`)
    const body = encodeURIComponent(`Hola ${contact.name},\n\nGracias por tu consulta sobre ${contact.property}.\n\n`)
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, "_self")
  }

  const openWhatsApp = (contact: Contact) => {
    const phoneNumber = contact.phone.replace(/\D/g, "")
    const message = encodeURIComponent(
      `Hola ${contact.name}, gracias por tu consulta sobre ${contact.property}. ¿En qué puedo ayudarte?`,
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const scheduleCall = (contact: Contact, datetime: string) => {
    // This would integrate with a calendar system
    console.log(`Scheduling call with ${contact.name} for ${datetime}`)
  }

  const sendFollowUp = (contact: Contact, template: string) => {
    // This would integrate with an email/SMS service
    console.log(`Sending follow-up to ${contact.name} with template: ${template}`)
  }

  return {
    callContact,
    openEmail,
    openWhatsApp,
    scheduleCall,
    sendFollowUp,
  }
}
