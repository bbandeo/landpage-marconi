"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (!name || !email || !message) {
      toast({
        title: "Error de validación",
        description: "Por favor, completa los campos obligatorios (Nombre, Email y Mensaje).",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message, status: "new" }),
      })

      if (!response.ok) {
        throw new Error("No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.")
      }

      toast({
        title: "¡Mensaje Enviado!",
        description: "Gracias por contactarnos. Te responderemos a la brevedad.",
      })

      // Reset form
      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado."
      toast({
        title: "Error al enviar",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="form-group">
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=" "
            className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500"
            required
          />
          <label htmlFor="name" className="floating-label">Nombre</label>
        </div>
        <div className="form-group">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500"
            required
          />
          <label htmlFor="email" className="floating-label">Email</label>
        </div>
      </div>

      <div className="form-group">
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=" "
          className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500"
        />
        <label htmlFor="phone" className="floating-label">Teléfono (Opcional)</label>
      </div>

      <div className="form-group">
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder=" "
          rows={4}
          className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500 resize-none"
          required
        />
        <label htmlFor="message" className="floating-label">Mensaje</label>
      </div>

      <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 btn-premium" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Mensaje"
        )}
      </Button>
    </form>
  )
}
