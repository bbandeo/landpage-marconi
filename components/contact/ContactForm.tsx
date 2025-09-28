"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { LeadSourceSelector, useLeadSourceDetection, useLeadSourceSelector } from "@/components/LeadSourceSelector";
import { useAnalytics } from "@/hooks/useAnalytics";
import { type LeadSourceCode } from "@/types/analytics";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const analytics = useAnalytics({ enableAutoTracking: true });
  const detectedSource = useLeadSourceDetection();
  const leadSource = useLeadSourceSelector(detectedSource || 'web_form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          message: `Asunto: ${form.subject}\n\n${form.message}`,
          source: leadSource.selectedSource || 'web_form',
        }),
      });

      if (!response.ok) throw new Error('Server error');

      const leadData = await response.json();
      if (leadData.id && leadSource.selectedSource) {
        await analytics.trackLeadGeneration(
          leadData.id,
          leadSource.selectedSource as LeadSourceCode
        );
      }

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      leadSource.reset();
    } catch (err) {
      setError('Hubo un error al enviar tu consulta. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-vibrant-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-premium-primary mb-2">¡Mensaje Enviado!</h3>
        <p className="text-premium-secondary mb-6">Gracias por contactarnos. Te responderemos a la brevedad.</p>
        <Button onClick={() => setSuccess(false)} variant="outline">Enviar otra consulta</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input required type="text" placeholder="Nombre completo *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input required type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input type="tel" placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Select required value={form.subject} onValueChange={(value) => setForm({ ...form, subject: value }) }>
          <SelectTrigger><SelectValue placeholder="Selecciona un asunto *" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="consulta-general">Consulta General</SelectItem>
            <SelectItem value="quiero-vender">Quiero Vender</SelectItem>
            <SelectItem value="quiero-comprar">Quiero Comprar</SelectItem>
            <SelectItem value="quiero-alquilar">Quiero Alquilar</SelectItem>
            <SelectItem value="otros">Otros</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <LeadSourceSelector {...leadSource.selectorProps} variant="select" className="w-full" />
      </div>
      <Textarea required placeholder="Tu mensaje *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="min-h-32" />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Enviando..." : "Enviar Consulta"}
        <Send className="w-5 h-5 ml-2" />
      </Button>
    </form>
  );
}
