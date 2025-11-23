import React from 'react';
import { ShieldCheck, Award, Users, Map } from 'lucide-react';

const features = [
  {
    icon: <Users strokeWidth={1} className="w-10 h-10 text-gray-300" />,
    title: "Atención Personalizada",
    description: "Cada cliente recibe un servicio único adaptado a sus necesidades específicas."
  },
  {
    icon: <Map strokeWidth={1} className="w-10 h-10 text-gray-300" />,
    title: "Conocimiento Local",
    description: "Años de experiencia dominando el mercado inmobiliario de Reconquista."
  },
  {
    icon: <Award strokeWidth={1} className="w-10 h-10 text-gray-300" />,
    title: "Profesionalismo",
    description: "Agentes certificados y en constante capacitación para brindarte seguridad."
  },
  {
    icon: <ShieldCheck strokeWidth={1} className="w-10 h-10 text-gray-300" />,
    title: "Resultados Comprobados",
    description: "Miles de transacciones exitosas y familias satisfechas nos respaldan."
  }
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#0f172a] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-white font-light mb-4">
            ¿Por qué elegir <span className="font-bold text-white">Marconi</span>?
          </h2>
          <div className="w-16 h-0.5 bg-orange-500 mx-auto opacity-70"></div>
        </div>

        {/* Grid 2x2 en tablet, 4 en desktop. Espaciado generoso */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="mb-6 p-4 rounded-full border border-gray-800 group-hover:border-gray-600 transition-colors">
                {feature.icon}
              </div>
              {/* Título blanco, sin naranja innecesario */}
              <h3 className="text-xl text-white font-medium mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
