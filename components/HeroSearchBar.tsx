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
      className="w-full max-w-4xl mx-auto"
    >
      {/* Command Bar - Horizontal Premium */}
      <div className="bg-[#0F1623]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/50">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="grid grid-cols-1 md:grid-cols-12 gap-2"
        >
          {/* Input 1: Operación */}
          <div className="md:col-span-4 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Briefcase className="h-5 w-5 text-slate-500 group-hover:text-orange-500 transition-colors" />
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none z-10">
              <ChevronDown className="h-4 w-4 text-slate-600" />
            </div>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="appearance-none w-full bg-[#05080F]/50 border border-white/5 rounded-xl py-4 pl-12 pr-10 text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:bg-[#05080F] transition-all cursor-pointer hover:bg-white/5"
            >
              <option value="" className="bg-[#0F1623] text-slate-300">Operación</option>
              <option value="sale" className="bg-[#0F1623] text-slate-300">Venta</option>
              <option value="rent" className="bg-[#0F1623] text-slate-300">Alquiler</option>
            </select>
          </div>

          {/* Input 2: Tipo de Propiedad */}
          <div className="md:col-span-5 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Home className="h-5 w-5 text-slate-500 group-hover:text-orange-500 transition-colors" />
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none z-10">
              <ChevronDown className="h-4 w-4 text-slate-600" />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="appearance-none w-full bg-[#05080F]/50 border border-white/5 rounded-xl py-4 pl-12 pr-10 text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:bg-[#05080F] transition-all cursor-pointer hover:bg-white/5"
            >
              <option value="" className="bg-[#0F1623] text-slate-300">Tipo de propiedad</option>
              <option value="house" className="bg-[#0F1623] text-slate-300">Casa</option>
              <option value="apartment" className="bg-[#0F1623] text-slate-300">Departamento</option>
              <option value="terreno" className="bg-[#0F1623] text-slate-300">Terreno</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full h-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-medium py-4 rounded-xl shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
        </form>
      </div>

      {/* Helper Text below search */}
      <div className="text-center mt-4">
        <p className="text-xs text-slate-600">
          Búsquedas populares: <span className="text-slate-400 hover:text-orange-500 transition-colors cursor-pointer">Zona Centro</span>, <span className="text-slate-400 hover:text-orange-500 transition-colors cursor-pointer">Departamentos</span>
        </p>
      </div>
    </motion.div>
  );
}