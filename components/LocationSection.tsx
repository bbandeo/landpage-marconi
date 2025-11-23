import React from 'react';

const LocationSection = () => {
  return (
    <section className="w-full h-[450px] relative bg-[#0f172a]">
      {/* Overlay para oscurecer el mapa y que no brille tanto */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>

      {/* Iframe de Google Maps con filtro de escala de grises */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3480.0!2d-59.6!3d-29.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDA5JzAwLjAiUyA1OcKwMzYnMDAuMCJX!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar"
        className="w-full h-full border-0 filter grayscale contrast-125 invert-[.1]"
        allowFullScreen
        loading="lazy"
        title="Ubicación Marconi"
      ></iframe>

      {/* Tarjeta flotante con la dirección (opcional, pero elegante) */}
      <div className="absolute top-1/2 left-4 md:left-20 transform -translate-y-1/2 z-20 bg-[#1e293b] p-6 rounded shadow-2xl border-l-4 border-orange-500 max-w-xs hidden md:block">
        <h3 className="text-white font-bold text-lg mb-1">Nuestra Oficina</h3>
        <p className="text-gray-400 text-sm">Jorge Newbery 1562</p>
        <p className="text-gray-400 text-sm mb-4">Reconquista, Santa Fe</p>
        <a href="#" className="text-orange-500 text-sm hover:underline flex items-center gap-1">
          Cómo llegar &rarr;
        </a>
      </div>
    </section>
  );
};

export default LocationSection;
