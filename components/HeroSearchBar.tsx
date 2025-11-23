"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Home, Briefcase, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSearchBar() {
  const router = useRouter();
  const [operation, setOperation] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (operation) {
      params.set("operation", operation);
    }

    if (propertyType) {
      params.set("type", propertyType);
    }

    const queryString = params.toString();
    const url = queryString ? `/propiedades?${queryString}` : "/propiedades";

    router.push(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-5xl mx-auto px-2 md:px-0"
    >
      {/* Command Bar - Premium Glassmorphism */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 md:p-3 shadow-2xl shadow-black/30">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3"
        >
          {/* Input 1: Operación */}
          <div className="md:col-span-4 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none z-10">
              <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-gray-400" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-y-0 right-4 md:right-5 flex items-center pointer-events-none z-10">
              <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-500" strokeWidth={1.5} />
            </div>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="appearance-none w-full bg-white/[0.03] border-0 rounded-xl py-3.5 md:py-4 pl-11 md:pl-13 pr-10 md:pr-12 text-sm md:text-base text-white/90 font-normal focus:outline-none focus:bg-white/[0.06] transition-all cursor-pointer hover:bg-white/[0.05]"
            >
              <option value="" className="bg-gray-900 text-gray-300">Operación</option>
              <option value="sale" className="bg-gray-900 text-white">Venta</option>
              <option value="rent" className="bg-gray-900 text-white">Alquiler</option>
            </select>
            {/* Divisor sutil */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-white/10 hidden md:block" />
          </div>

          {/* Input 2: Tipo de Propiedad */}
          <div className="md:col-span-5 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none z-10">
              <Home className="h-4 w-4 md:h-5 md:w-5 text-gray-400" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-y-0 right-4 md:right-5 flex items-center pointer-events-none z-10">
              <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-500" strokeWidth={1.5} />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="appearance-none w-full bg-white/[0.03] border-0 rounded-xl py-3.5 md:py-4 pl-11 md:pl-13 pr-10 md:pr-12 text-sm md:text-base text-white/90 font-normal focus:outline-none focus:bg-white/[0.06] transition-all cursor-pointer hover:bg-white/[0.05]"
            >
              <option value="" className="bg-gray-900 text-gray-300">Tipo de propiedad</option>
              <option value="house" className="bg-gray-900 text-white">Casa</option>
              <option value="apartment" className="bg-gray-900 text-white">Departamento</option>
              <option value="terreno" className="bg-gray-900 text-white">Terreno</option>
            </select>
          </div>

          {/* Submit Button - Único elemento naranja */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full h-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-semibold py-3.5 md:py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base"
            >
              <Search className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}