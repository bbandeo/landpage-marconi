"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Search,
  MapPin,
  Landmark,
  Bed,
  Bath,
  Square,
  ArrowRight,
  MessageCircle,
  Star,
  Users,
  Home,
  Award,
  Heart,
  Eye,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeaturedPropertiesSlider } from "@/components/FeaturedPropertiesSlider";
import { HeroSearchBar } from "@/components/HeroSearchBar";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Importar servicios
import { useIsClient } from "@/hooks/use-is-client";
import { PropertyService } from "@/services/properties";
import type { Property } from "@/lib/supabase";

// Importar mapa con dynamic import (SSR disabled)
const InteractivePropertyMap = dynamic(
  () => import("@/components/map/InteractivePropertyMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-night-blue rounded-xl flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-support-gray/20 border-t-vibrant-orange mx-auto" />
          <p className="text-bone-white">Cargando mapa...</p>
        </div>
      </div>
    ),
  }
);

// Componente para animación de contador
function CounterAnimation({ value, label, icon: Icon }: { value: string, label: string, icon: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, ''));
      let start = 0;
      const duration = 2000;
      const increment = numericValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const displayValue = isInView ? 
    (value.includes('+') ? `${count}+` : 
     value.includes('%') ? `${count}%` : 
     value.includes('.') ? value : 
     count.toString()) : '0';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-600 to-red-600 rounded-full mb-6 shadow-xl shadow-orange-600/30 group-hover:shadow-orange-600/50 transition-all duration-300"
      >
        <Icon className="h-12 w-12 text-white" />
      </motion.div>
      <motion.div 
        className="text-4xl font-bold text-white mb-3"
        animate={isInView ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {displayValue}
      </motion.div>
      <div className="text-gray-300 text-lg font-medium">{label}</div>
    </motion.div>
  );
}

// Componente de chispas para la ignición
function Sparks({ isVisible }: { isVisible: boolean }) {
  const sparks = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 45) + Math.random() * 20 - 10,
    distance: 80 + Math.random() * 60,
    duration: 0.6 + Math.random() * 0.4,
    size: 3 + Math.random() * 3,
  }));

  return (
    <AnimatePresence>
      {isVisible && sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: Math.cos(spark.angle * Math.PI / 180) * spark.distance,
            y: Math.sin(spark.angle * Math.PI / 180) * spark.distance,
            opacity: 0,
            scale: 0
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: spark.duration,
            ease: "easeOut"
          }}
          className="absolute rounded-full"
          style={{
            width: spark.size,
            height: spark.size,
            background: `linear-gradient(135deg, #fff, #f97316)`,
            boxShadow: `0 0 ${spark.size * 2}px #f97316, 0 0 ${spark.size * 4}px rgba(249, 115, 22, 0.5)`,
          }}
        />
      ))}
    </AnimatePresence>
  );
}

export default function HomePage() {
  const [currentStat, setCurrentStat] = useState(0);
  const isClient = useIsClient();

  // Estados para la secuencia de animación del Hero
  const [showBlackout, setShowBlackout] = useState(true);
  const [showSparks, setShowSparks] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showLoopVideo, setShowLoopVideo] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  
  // Parallax effects DISABLED to prevent elements escaping hero boundaries
  const { scrollY } = useScroll();
  // All transforms set to 0 to eliminate any movement
  const heroY = useTransform(scrollY, [0, 800], [0, 0]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 1]);
  const contentY = useTransform(scrollY, [0, 400], [0, 0]);
  const bottomY = useTransform(scrollY, [0, 500], [0, 0]);
  const scrollIndicatorY = useTransform(scrollY, [0, 300], [0, 0]);

  // Estados para datos del backend
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyId: null as number | null,
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const stats = [
    { number: "200+", label: "Propiedades Vendidas" },
    { number: "98%", label: "Clientes Satisfechos" },
    { number: "5", label: "Años de Experiencia" },
    { number: "24/7", label: "Atención Disponible" },
  ];

  // Cargar propiedades destacadas al montar el componente
  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        setLoadingProperties(true);
        const properties = await PropertyService.getFeaturedProperties();
        setFeaturedProperties(properties);
      } catch (error) {
        console.error("Error loading featured properties:", error);
      } finally {
        setLoadingProperties(false);
      }
    };

    loadFeaturedProperties();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Secuencia de animación coordinada del Hero
  useEffect(() => {
    // Fase 0: Blackout se desvanece (0.3s)
    const phase0 = setTimeout(() => {
      setShowBlackout(false);
      setAnimationPhase(1);
    }, 300);

    // Fase 1: Grid aparece (1s)
    const phase1 = setTimeout(() => {
      setAnimationPhase(2);
    }, 1000);

    // Fase 2: Video + Línea neón (1.5s)
    const phase2 = setTimeout(() => {
      setAnimationPhase(3);
    }, 1500);

    // Fase 3: Ignición - chispas (3.8s)
    const phase3 = setTimeout(() => {
      setShowSparks(true);
      setAnimationPhase(4);
      // Ocultar chispas después de 1s
      setTimeout(() => setShowSparks(false), 1000);
    }, 3800);

    // Fase 4: Contenido (4.2s)
    const phase4 = setTimeout(() => {
      setAnimationPhase(5);
    }, 4200);

    return () => {
      clearTimeout(phase0);
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(phase3);
      clearTimeout(phase4);
    };
  }, []);


  /* 


  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (operationType) params.set("operation", operationType)
    if (propertyType) params.set("type", propertyType)

    window.location.href = `/propiedades?${params.toString()}`
  } */

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case "house":
        return "Casa";
      case "apartment":
        return "Departamento";
      case "commercial":
        return "Comercial";
      case "land":
        return "Terreno";
      default:
        return type;
    }
  };

  // Manejar interés en una propiedad específica
  const handlePropertyInterest = (property: Property) => {
    setContactForm((prev) => ({
      ...prev,
      message: `Hola, me interesa la propiedad: ${property.title} (${
        property.currency
      }$ ${property.price.toLocaleString()}). Me gustaría recibir más información.`,
      propertyId: property.id,
    }));

    // Scroll al formulario de contacto
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-premium-main">
      {/* Header Premium */}
      <Header />

      {/* HERO SECTION - SPLIT TECH con Animación Coordinada */}
      <section className="relative w-full h-[calc(100vh-76px)] lg:h-[calc(100vh-90px)] flex flex-col lg:flex-row bg-[#0a0a0c] overflow-hidden">

        {/* ═══════════════════════════════════════════════════════════════
            FASE 0: BLACKOUT OVERLAY
            Se desvanece primero para revelar la escena
            ═══════════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {showBlackout && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="fixed inset-0 bg-black z-[100] pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* COLUMNA IZQUIERDA: CONTENIDO (Texto) */}
        <div className="w-full lg:w-[42%] h-[60%] lg:h-full flex flex-col justify-center px-8 lg:px-16 z-10 order-2 lg:order-1 relative bg-[#0a0a0c]">

          {/* ═══════════════════════════════════════════════════════════════
              FASE 1: BLUEPRINT GRID - Aparece con fade sutil
              ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase >= 1 ? 0.3 : 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* ═══════════════════════════════════════════════════════════════
              FASE 2: LÍNEA DIVISORIA SUTIL
              Gradiente que se desvanece para no competir con el título
              ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ height: 0, top: "50%", opacity: 0 }}
            animate={animationPhase >= 2 ? {
              height: "100%",
              top: 0,
              opacity: 1,
            } : { height: 0, top: "50%", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:block absolute right-0 w-[1px] z-20"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(249, 115, 22, 0.3) 20%, rgba(249, 115, 22, 0.4) 50%, rgba(249, 115, 22, 0.3) 80%, transparent 100%)',
            }}
          />

          {/* ═══════════════════════════════════════════════════════════════
              PULSO DE ENERGÍA - Viaja por la línea hacia el contenido
              ═══════════════════════════════════════════════════════════════ */}
          {animationPhase >= 3 && (
            <motion.div
              initial={{ top: -30, opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="hidden lg:block absolute right-[-2px] w-[5px] h-8 rounded z-30 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent, #fff, #f97316, transparent)',
                filter: 'blur(1px)'
              }}
            />
          )}

          {/* ═══════════════════════════════════════════════════════════════
              FASE 3: CHISPAS DE IGNICIÓN
              Salen disparadas cuando se enciende la animación
              ═══════════════════════════════════════════════════════════════ */}
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-center z-30 pointer-events-none">
            <Sparks isVisible={showSparks} />
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              FASE 4: CONTENIDO - Aparece en cascada
              ═══════════════════════════════════════════════════════════════ */}

          {/* Título Principal */}
          <div className="overflow-hidden relative z-10 mb-6">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={animationPhase >= 4 ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Encontrá tu
              </h1>
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={animationPhase >= 4 ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
            >
              <span
                className="text-4xl lg:text-5xl xl:text-6xl font-bold relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                hogar ideal
              </span>
              {/* Underline que se dibuja */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={animationPhase >= 5 ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="h-[2px] mt-2 origin-left"
                style={{ background: 'linear-gradient(to right, #f97316, #ea580c, transparent)' }}
              />
            </motion.div>
          </div>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-[#888] text-base lg:text-lg mb-8 max-w-[280px] leading-relaxed relative z-10"
          >
            Somos expertos en el mercado inmobiliario de Reconquista. Te acompañamos en cada paso hacia tu nuevo hogar.
          </motion.p>

          {/* Botones CTA con efecto shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-3 lg:gap-4 relative z-10"
          >
            <Link href="/propiedades">
              <button className="relative px-6 py-3 bg-[#ea580c] hover:bg-orange-500 text-white text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-300 overflow-hidden group">
                Ver Propiedades
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </Link>
            <Link href="/contacto">
              <button className="px-6 py-3 border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-300">
                Contactar →
              </button>
            </Link>
          </motion.div>

          {/* SCROLL INDICATOR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={animationPhase >= 5 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-2 mt-8 lg:mt-12 relative z-10"
          >
            <span className="text-[9px] tracking-[0.2em] text-gray-500 uppercase font-mono">Scroll</span>
            <div className="relative w-[1px] h-8 bg-gray-700 overflow-hidden">
              <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-full h-full bg-gradient-to-b from-orange-500 to-transparent"
              />
            </div>
          </motion.div>

        </div>

        {/* COLUMNA DERECHA: VIDEO */}
        <div className="w-full lg:w-[58%] h-[40%] lg:h-full relative order-1 lg:order-2">

          {/* Gradiente de fusión */}
          <div className="absolute inset-y-0 left-0 w-20 lg:w-24 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

          {/* Gradiente inferior en móvil */}
          <div className="lg:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

          {/* Video Principal - Se reproduce una vez */}
          <video
            ref={heroVideoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: animationPhase >= 2 && !showLoopVideo ? 1 : 0,
              transition: 'opacity 0.3s ease-out'
            }}
            autoPlay
            muted
            playsInline
            onEnded={() => setShowLoopVideo(true)}
          >
            <source src="/assets/hero/video-casa-hero-1.mp4" type="video/mp4" />
          </video>

          {/* Video Loop - Se reproduce 5 veces y se congela en el segundo 4 de la 5ta reproducción */}
          <video
            ref={loopVideoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: showLoopVideo ? 1 : 0,
              transition: 'opacity 0.3s ease-out'
            }}
            autoPlay
            muted
            playsInline
            onTimeUpdate={() => {
              // En la 5ta reproducción (loopCount === 4), pausar en el segundo 4
              if (loopCount === 4 && loopVideoRef.current && loopVideoRef.current.currentTime >= 4) {
                loopVideoRef.current.pause();
              }
            }}
            onEnded={() => {
              const newCount = loopCount + 1;
              setLoopCount(newCount);
              if (newCount < 5 && loopVideoRef.current) {
                loopVideoRef.current.currentTime = 0;
                loopVideoRef.current.play();
              }
            }}
          >
            <source src="/assets/hero/video-casa-loop-1.mp4" type="video/mp4" />
          </video>
        </div>

      </section>

      {/* Transición suave Hero → Propiedades */}
      <div className="relative h-32 w-full bg-gradient-to-b from-[#0a0a0c] via-[#0d0f14] to-slate-900 overflow-hidden">
        {/* Línea decorativa sutil */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      </div>

      {/* Propiedades Destacadas - PREMIUM DESIGN */}
      <section
        id="propiedades"
        className="section-spacing relative overflow-hidden"
      >
        {/* Fondo simplificado y elegante */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
          {/* Sombras suaves para profundidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        </div>

        <div className="container-premium relative z-10">
          {/* Header Premium - JERARQUÍA TIPOGRÁFICA OPTIMIZADA */}
          <div className="text-center mb-12">
            {/* Título principal */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              Propiedades destacadas
            </motion.h2>

            {/* Subtítulo simplificado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-gray-400 text-lg leading-relaxed">
                Hogares seleccionados con estándares de excelencia para tu familia.
              </p>
            </motion.div>
          </div>

          {loadingProperties ? (
            <div className="text-center py-premium-lg">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-support-gray/20 border-t-vibrant-orange mx-auto shadow-xl"></div>
              <p className="text-premium-primary mt-premium-md body-lg pulse-premium">Cargando propiedades...</p>
            </div>
          ) : (
            <>
              {/* CONTENEDOR PREMIUM SOLO PARA CARDS Y NAVEGACIÓN */}
              <div className="relative bg-[#141826] rounded-3xl shadow-xl shadow-black/40 px-8 py-10">
                <div className="max-w-7xl mx-auto">
                  <FeaturedPropertiesSlider properties={featuredProperties} />
                </div>
              </div>

              {/* CTA PREMIUM - BOTÓN CON GLOW Y FLECHA ANIMADA (FUERA DEL CONTENEDOR) */}
              {featuredProperties.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mt-16"
                >
                  <Link href="/propiedades">
                    <Button
                      size="lg"
                      className="max-w-md bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-orange-600/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-105 group border-0 flex items-center justify-center gap-2"
                    >
                      VER TODO EL CATÁLOGO
                      <span className="transform transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Button>
                  </Link>
                  <p className="text-secondary mt-4 text-lg font-medium text-center">
                    Encontrá la propiedad perfecta para vos.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Separador decorativo minimalista entre secciones */}
      <div className="relative w-full flex justify-center my-12">
        <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-gray-600/40 to-transparent" />
        <span className="absolute -top-3 bg-[#0d0f1a] px-3 text-gray-500 text-sm">
          • • •
        </span>
      </div>

      {/* MAPA INTERACTIVO - Sección del mapa de propiedades */}
      <section
        id="mapa"
        className="section-spacing relative overflow-hidden bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900"
      >
        <div className="container-premium relative z-10">
          {/* Header de la sección */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibrant-orange/10 border border-vibrant-orange/30 mb-6"
            >
              <Map className="w-5 h-5 text-vibrant-orange" />
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wide">
                Explora Ubicaciones
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              Mapa de Propiedades Disponibles
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Descubre todas nuestras propiedades en Reconquista y alrededores. Haz clic en los marcadores para ver
              más información.
            </motion.p>
          </div>

          {/* Mapa interactivo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-night-blue/50 backdrop-blur-sm rounded-2xl p-2 sm:p-4 border border-support-gray/20 shadow-2xl">
              <InteractivePropertyMap height="600px" className="shadow-xl" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-vibrant-orange/5 via-transparent to-vibrant-orange/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>

          {/* Info adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-subtle-gray text-sm">
              💡 <span className="text-bone-white">Tip:</span> Haz zoom y arrastra para explorar diferentes zonas.
              Los clusters naranjas muestran grupos de propiedades cercanas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Separador decorativo minimalista entre secciones */}
      <div className="relative w-full flex justify-center my-12">
        <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-gray-600/40 to-transparent" />
        <span className="absolute -top-3 bg-[#0d0f1a] px-3 text-gray-500 text-sm">
          • • •
        </span>
      </div>

      {/* QUIÉNES SOMOS - Sección informativa con diseño consistente */}
      <section className="section-spacing bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Columna de texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/60 border border-gray-700/60 secondary-text">
              Conocé nuestro equipo
            </div>
            <h2 className="section-title">
              ¿Quiénes somos?
            </h2>
            <p className="text-lg text-secondary">
              Somos <span className="font-semibold text-white">Marconi Inmobiliaria</span>, una empresa local que entiende tus
              necesidades. Conocemos Reconquista como la palma de nuestra mano y te acompañamos en cada paso.
            </p>
            <p className="text-lg text-secondary">
              Con un enfoque joven y dinámico, nos especializamos en encontrar la propiedad perfecta para cada cliente,
              desde hogares familiares hasta inversiones estratégicas.
            </p>

            {/* Beneficios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-white/90 font-medium">Confianza local</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30">
                  <Landmark className="w-5 h-5" />
                </div>
                <span className="text-white/90 font-medium">Conocimiento del mercado</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-white/90 font-medium">Atención personalizada</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-white/90 font-medium">Experiencia comprobada</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/agentes">
                <Button
                  size="lg"
                  className="mt-8 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold px-12 py-6 rounded-full shadow-2xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all duration-300 group border-0 w-fit text-lg"
                >
                  Conocé más
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-4"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Columna imagen */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rotate-[-4deg]">
              <div className="rounded-3xl border-4 border-orange-500/30 p-2 bg-orange-500/10">
                <div className="rounded-2xl overflow-hidden bg-gray-800">
                  <Image
                    src={
                      getOptimizedImageUrl("gustavo_vdczse", { width: 900, height: 600, gravity: "face", format: "auto", quality: "auto" }) || "/placeholder.svg"
                    }
                    alt="Foto de Gustavo Marconi"
                    width={900}
                    height={600}
                    className="w-full h-[360px] md:h-[420px] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Tarjeta de nombre */}
            <div className="absolute -bottom-6 left-6 bg-black/80 text-white rounded-xl px-4 py-3 shadow-2xl border border-white/10">
              <div className="font-semibold">Gustavo Marconi</div>
              <div className="text-sm text-gray-300">Fundador & Agente Principal</div>
              <div className="text-orange-400 text-xs">★★★★★</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION - DISEÑO PREMIUM SIMPLIFICADO */}
      <section className="section-spacing bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 relative overflow-hidden">
        {/* Patrón de textura sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.1) 2px,
              rgba(255,255,255,0.1) 4px
            )`
          }} />
        </div>
        
        {/* Elementos decorativos flotantes */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm"
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="section-title text-center mb-8"
            >
              COMENZÁ TU BÚSQUEDA HOY MISMO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="subtitle text-center text-white mb-12 max-w-3xl mx-auto"
            >
              Acompañamiento profesional premium para encontrar la propiedad perfecta que transforme tu vida
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/propiedades">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-bold rounded-full shadow-2xl shadow-black/30 hover:shadow-black/50 transition-all duration-300 hover:scale-105 border-2 border-white/20 hover:border-white/40 min-w-[280px]"
                >
                  EXPLORAR PROPIEDADES
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-3"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </Button>
              </Link>
              
              <Link href="/contacto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-bold rounded-full bg-transparent backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl min-w-[280px]"
                >
                  CONTACTAR EXPERTO
                </Button>
              </Link>
            </motion.div>

            {/* Elemento decorativo inferior */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <div className="w-24 h-1 bg-white/40 mx-auto rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SEPARADOR WAVE DIVIDER */}
      <div className="relative">
        <svg 
          className="w-full h-24 text-gray-900" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,40 C300,120 900,0 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <Footer />
    </div>
  );
}
