"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Mensaje enviado",
          description: "Gracias por contactarnos. Te responderemos pronto.",
        })
        e.currentTarget.reset()
      } else {
        throw new Error("Error al enviar el mensaje")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="form-group">
          <Input
            type="text"
            name="name"
            placeholder=" "
            className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500"
            required
          />
          <label className="floating-label">Nombre</label>
        </div>
        <div className="form-group">
          <Input
            type="email"
            name="email"
            placeholder=" "
            className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500"
            required
          />
          <label className="floating-label">Email</label>
        </div>
      </div>

      <div className="form-group">
        <Input
          type="tel"
          name="phone"
          placeholder=" "
          className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500"
          required
        />
        <label className="floating-label">Teléfono</label>
      </div>

      <div className="form-group">
        <Textarea
          name="message"
          placeholder=" "
          rows={4}
          className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500 resize-none"
          required
        />
        <label className="floating-label">Mensaje</label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-orange-500 hover:bg-orange-600 btn-premium"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
      </Button>
    </form>
  )
}
