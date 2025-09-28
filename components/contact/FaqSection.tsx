"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto tiempo toma vender una propiedad?",
    answer: "El tiempo promedio de venta varía, pero nuestro equipo utiliza estrategias de marketing avanzadas para asegurar un proceso rápido y eficiente, generalmente entre 60 y 120 días.",
  },
  {
    question: "¿Qué documentación necesito para vender mi propiedad?",
    answer: "Necesitarás la escritura, cédula catastral, DNI del propietario y certificados de libre deuda. Te guiaremos en cada paso para asegurar que todo esté en orden.",
  },
  {
    question: "¿Cobran comisión por mostrar propiedades?",
    answer: "No. Nuestro servicio de mostrar propiedades es completamente gratuito para los compradores. La comisión solo se aplica al concretar exitosamente la operación.",
  },
  {
    question: "¿Ofrecen tasaciones de propiedades?",
    answer: "Sí, ofrecemos un servicio de tasación profesional para determinar el valor de mercado justo de tu propiedad, asegurando que obtengas el mejor precio posible.",
  },
];

export function FaqSection() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <AccordionItem value={`item-${index}`} className="border-b-support-gray/20">
            <AccordionTrigger className="text-left text-lg font-semibold text-premium-primary hover:text-vibrant-orange">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-premium-secondary text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}
