import type { Contact } from "./useContacts"

export function useContactActions() {
  const openWhatsApp = (contact: Contact) => {
    const message = encodeURIComponent(
      `Hola ${contact.name}, te contacto desde Marconi Inmobiliaria sobre tu consulta por "${contact.property}". ¿Podríamos coordinar una reunión?`,
    )
    const phone = contact.phone.replace(/\D/g, "")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  const openEmail = (contact: Contact) => {
    const subject = encodeURIComponent(`Re: Consulta sobre ${contact.property}`)
    const body = encodeURIComponent(
      `Hola ${contact.name},\n\nGracias por tu interés en "${contact.property}".\n\nMe pongo en contacto para coordinar una visita y resolver todas tus consultas.\n\nSaludos,\nEquipo Marconi Inmobiliaria`,
    )
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`)
  }

  const callContact = (contact: Contact) => {
    window.open(`tel:${contact.phone}`)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return {
    openWhatsApp,
    openEmail,
    callContact,
    copyToClipboard,
  }
}
