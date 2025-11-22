"use client";

import { motion } from "framer-motion";
import { Clock, Home, Users } from "lucide-react";
import { useEffect, useState } from "react";

const cards = [
  {
    id: "active",
    label: "Personas explorando",
    icon: Users,
    suffix: " ahora",
    color: "from-orange-500/20 to-pink-500/10",
  },
  {
    id: "inventory",
    label: "Propiedades activas",
    icon: Home,
    suffix: " listadas",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "update",
    label: "Actualización",
    icon: Clock,
    suffix: " min",
    color: "from-green-400/20 to-emerald-500/10",
  },
];

export default function HeroIndicators() {
  const [activeUsers, setActiveUsers] = useState(5);
  const [inventory, setInventory] = useState(42);
  const [minutes, setMinutes] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => Math.max(3, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
      setMinutes((prev) => (prev + 1) % 12);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const inventoryInterval = setInterval(() => {
      setInventory((prev) => Math.max(30, Math.min(55, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 6000);

    return () => clearInterval(inventoryInterval);
  }, []);

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {cards.map(({ id, label, icon: Icon, suffix, color }, idx) => {
        const value =
          id === "active" ? activeUsers : id === "inventory" ? inventory : minutes || 1;

        return (
          <motion.div
            key={id}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${color} p-4`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">{label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {value}
                  <span className="ml-1 text-sm text-white/60">{suffix}</span>
                </p>
              </div>
              <div className="rounded-full bg-white/10 p-2 text-white/70">
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
              animate={{ opacity: [0, 0.4, 0], x: ["-50%", "150%"] }}
              transition={{ duration: 4, repeat: Infinity, delay: idx * 0.4 }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}