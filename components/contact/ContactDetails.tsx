"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Llamanos",
    content: "+54 3482 308100",
    action: "tel:+543482308100",
  },
  {
    icon: Mail,
    title: "Escribinos",
    content: "marconinegociosinmobiliarios@hotmail.com",
    action: "mailto:marconinegociosinmobiliarios@hotmail.com",
  },
  {
    icon: MapPin,
    title: "Visitanos",
    content: "Jorge Newbery 1562, Reconquista, Santa Fe",
    action: "https://maps.google.com/?q=Jorge+Newbery+1562,+Reconquista,+Santa+Fe",
  },
  {
    icon: Clock,
    title: "Horarios",
    content: "Lunes a Viernes: 9:00 - 18:00",
    action: "#",
  },
];

export function ContactDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {contactDetails.map((detail, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <a href={detail.action} target="_blank" rel="noopener noreferrer" className="block h-full">
            <Card className="h-full bg-premium-card hover:bg-vibrant-orange/10 border-support-gray/20 hover:border-vibrant-orange/30 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-vibrant-orange/10 group-hover:bg-vibrant-orange/20 rounded-full mb-4 transition-colors duration-300">
                  <detail.icon className="w-8 h-8 text-vibrant-orange" />
                </div>
                <h3 className="text-xl font-bold text-premium-primary mb-2">{detail.title}</h3>
                <p className="text-premium-secondary group-hover:text-vibrant-orange transition-colors duration-300">{detail.content}</p>
              </CardContent>
            </Card>
          </a>
        </motion.div>
      ))}
    </div>
  );
}
