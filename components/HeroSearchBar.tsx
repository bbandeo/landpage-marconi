"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSearchBar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Usar activeTab para la operación (buy = sale, rent = rent)
    const operation = activeTab === "buy" ? "sale" : "rent";
    params.set("operation", operation);

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
      className="w-full max-w-md mx-auto relative z-20"
    >
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-2 shadow-2xl ring-1 ring-white/5">

        {/* Tabs (Buy/Rent) */}
        <div className="flex p-1 mb-4 bg-black/40 rounded-2xl">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === 'buy' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Comprar
          </button>
          <button
            onClick={() => setActiveTab('rent')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === 'rent' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Alquilar
          </button>
        </div>

        <div className="space-y-3 px-2 pb-2">
          {/* Input: Tipo de Propiedad */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Home className="h-5 w-5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="block w-full pl-12 pr-10 py-4 bg-black/20 border border-white/5 rounded-2xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-black/40 transition-all appearance-none cursor-pointer hover:bg-black/30"
            >
              <option value="">Tipo de propiedad</option>
              <option value="house">Casa</option>
              <option value="apartment">Departamento</option>
              <option value="terreno">Terreno</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="glow-on-hover w-full mt-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-900/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <Search className="w-5 h-5" />
            <span>Buscar Propiedades</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}