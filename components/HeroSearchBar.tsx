"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Home, Building, TreePine } from "lucide-react";
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
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-gray-900 rounded-xl p-3 border border-gray-700/30">
        {/* Tabs (Buy/Rent) */}
        <div className="flex p-1 mb-3 bg-black/40 rounded-lg max-w-xs mx-auto">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${activeTab === 'buy' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Comprar
          </button>
          <button
            onClick={() => setActiveTab('rent')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${activeTab === 'rent' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Alquilar
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-stretch">
          {/* Tipo de Propiedad */}
          <div className="flex-1">
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-white/5 border-white/15 text-white/90 rounded-lg h-9 text-sm focus:border-orange-400/50 focus:ring-1 focus:ring-orange-400/20 transition-colors">
                <SelectValue placeholder="Tipo de propiedad" />
              </SelectTrigger>
              <SelectContent
                className="bg-gray-900/95 border-gray-700/50 backdrop-blur-md"
                position="popper"
                sideOffset={4}
              >
                <SelectItem value="house" className="text-white/90 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Home className="w-3.5 h-3.5" />
                    Casa
                  </div>
                </SelectItem>
                <SelectItem value="apartment" className="text-white/90 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5" />
                    Departamento
                  </div>
                </SelectItem>
                <SelectItem value="terreno" className="text-white/90 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <TreePine className="w-3.5 h-3.5" />
                    Terreno
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botón de Búsqueda */}
          <Button
            onClick={handleSearch}
            className="glow-on-hover bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-medium px-5 h-9 text-sm rounded-lg transition-all duration-200 hover:scale-[1.02] border-0 shadow-lg"
          >
            <Search className="w-4 h-4 mr-1.5" />
            Buscar
          </Button>
        </div>
      </div>
    </motion.div>
  );
}