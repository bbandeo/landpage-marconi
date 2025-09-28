
import React from 'react';
import Image from 'next/image';

const ContactHero = () => {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full">
      <Image
        src="/assets/hero/contact-hero-glow.png"
        alt="Contacto - Marconi Inmobiliaria"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Contacto</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          ¿Tenés alguna consulta? Estamos para ayudarte.
        </p>
      </div>
    </div>
  );
};

export default ContactHero;
