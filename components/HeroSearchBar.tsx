"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Home, Building, TreePine } from "lucide-react";
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

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case "house":
        return <Home className="w-4 h-4" />;
      case "apartment":
        return <Building className="w-4 h-4" />;
      case "terreno":
        return <TreePine className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-night-blue/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          {/* Operación */}
          <div className="flex-1 min-w-0">
            <label className="block text-white/90 text-sm font-medium mb-2">
              Operación
            </label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm rounded-xl h-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300">
                <SelectValue placeholder="Seleccionar operación" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="sale" className="text-white hover:bg-gray-800">
                  Venta
                </SelectItem>
                <SelectItem value="rent" className="text-white hover:bg-gray-800">
                  Alquiler
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Propiedad */}
          <div className="flex-1 min-w-0">
            <label className="block text-white/90 text-sm font-medium mb-2">
              Tipo de propiedad
            </label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm rounded-xl h-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="house" className="text-white hover:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Casa
                  </div>
                </SelectItem>
                <SelectItem value="apartment" className="text-white hover:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Departamento
                  </div>
                </SelectItem>
                <SelectItem value="terreno" className="text-white hover:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <TreePine className="w-4 h-4" />
                    Terreno
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botón de Búsqueda */}
          <div className="w-full lg:w-auto">
            <Button
              onClick={handleSearch}
              size="lg"
              className="w-full lg:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold px-8 py-3 h-12 text-base rounded-xl shadow-2xl shadow-orange-600/40 hover:shadow-orange-600/60 transition-all duration-300 hover:scale-105 border-0 min-w-[180px]"
            >
              <Search className="w-5 h-5 mr-2" />
              BUSCAR
            </Button>
          </div>
        </div>

        {/* Mensaje informativo */}
        <div className="mt-4 text-center">
          <p className="text-white/70 text-sm">
            Encontrá la propiedad perfecta con nuestros filtros especializados
          </p>
        </div>
      </div>
    </motion.div>
  );
}