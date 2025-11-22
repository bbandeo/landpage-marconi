"use client";

import { motion } from 'framer-motion';
import { Users, Home, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroIndicators() {
  const [activeUsers, setActiveUsers] = useState(3);
  const [lastUpdate, setLastUpdate] = useState(2);
  const [availableProperties, setAvailableProperties] = useState(42);

  useEffect(() => {
    // Simular actualizaciones dinámicas
    const interval = setInterval(() => {
      setActiveUsers(prev => Math.max(2, Math.min(8, prev + Math.floor(Math.random() * 3) - 1)));
      setLastUpdate(prev => (prev + 1) % 60);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap gap-3 mb-6"
    >
      {/* Badge de usuarios activos */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full"
        animate={{
          borderColor: ['rgba(255, 107, 53, 0.3)', 'rgba(255, 107, 53, 0.5)', 'rgba(255, 107, 53, 0.3)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
        </span>
        <Users className="w-3 h-3 text-orange-300" />
        <span className="text-orange-300 text-sm font-medium">
          {activeUsers} personas explorando ahora
        </span>
      </motion.div>

      {/* Badge de propiedades disponibles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full"
      >
        <Home className="w-3 h-3 text-blue-300" />
        <span className="text-blue-300 text-sm font-medium">
          {availableProperties} propiedades disponibles
        </span>
      </motion.div>

      {/* Badge de última actualización */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-full"
      >
        <Clock className="w-3 h-3 text-green-300" />
        <span className="text-green-300 text-sm font-medium">
          Actualizado hace {lastUpdate} min
        </span>
      </motion.div>
    </motion.div>
  );
}