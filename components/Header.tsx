"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsClient } from "@/hooks/use-is-client";

interface HeaderProps {
  showMobileSearch?: boolean;
}

export default function Header({ showMobileSearch = true }: HeaderProps) {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isClient = useIsClient();

  const isActivePage = (path: string) => {
    return pathname === path;
  };

  const getLinkClassName = (path: string) => {
    if (isActivePage(path)) {
      return "interactive-element border-b-2 border-vibrant-orange pb-1 font-medium";
    }
    return "text-bone-white/80 hover:text-vibrant-orange transition-colors";
  };

  // Special case for contacto page - uses vibrant orange ONLY when active
  const getContactLinkClassName = () => {
    if (isActivePage("/contacto")) {
      return "interactive-element border-b-2 border-vibrant-orange pb-1 font-medium";
    }
    return "text-bone-white/80 hover:text-vibrant-orange transition-colors";
  };

  // Special case for agentes page - uses vibrant orange ONLY when active
  const getAgentesLinkClassName = () => {
    if (isActivePage("/agentes")) {
      return "interactive-element border-b-2 border-vibrant-orange pb-1 font-medium";
    }
    return "text-bone-white/80 hover:text-vibrant-orange transition-colors";
  };

  // Scroll progress tracking + glassmorphism effect
  useEffect(() => {
    if (!isClient) {
      return;
    }
    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(winScroll > 50);
    };
    window.addEventListener("scroll", handleScroll);
    // Ejecutar una vez para inicializar en el primer render del cliente
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  // Cerrar menú móvil cuando se hace scroll
  useEffect(() => {
    if (scrolled && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [scrolled]);

  return (
    <>
      {/* NAVBAR MOBILE - Altura fija 64px */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}>
        {/* Scroll Progress Bar - PREMIUM */}
        <div
          aria-hidden
          className="absolute top-0 left-0 h-1 z-[60] pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-vibrant-orange to-transparent shadow-lg" />
        </div>

        {/* MOBILE: Altura fija 64px | DESKTOP: Alturas responsivas */}
        <div className="w-full px-6 md:container-premium">
          <div className="flex items-center justify-between h-16 md:h-[90px] 2xl:h-[110px]">
            {/* Logo - Altura 28px en mobile */}
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logos/marconi_header_orangewhite.png"
                alt="Marconi Inmobiliaria"
                width={140}
                height={45}
                className="h-7 md:h-11 2xl:h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation - PREMIUM SPACING */}
            <nav className="hidden md:flex items-center space-x-12">
              <Link
                href="/propiedades"
                className={getLinkClassName("/propiedades")}
              >
                <span className="body-md 2xl:text-base font-medium tracking-wide">
                  PROPIEDADES
                </span>
              </Link>
              <Link
                href="/agentes"
                className={getAgentesLinkClassName()}
              >
                <span className="body-md 2xl:text-base font-medium tracking-wide">
                  AGENTES
                </span>
              </Link>
              <Link
                href="/contacto"
                className={getContactLinkClassName()}
              >
                <span className="body-md 2xl:text-base font-medium tracking-wide">
                  CONTACTO
                </span>
              </Link>
            </nav>

            {/* Mobile Menu Button - Touch-friendly 40x40px con fondo */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center bg-[#1A1D2E] hover:bg-[#252836] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Decorative divider line - Solo cuando hay scroll */}
        {scrolled && (
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-vibrant-orange/50 to-transparent"></div>
        )}
      </header>

      {/* MOBILE MENU OVERLAY - Fondo sólido opaco que cubre la pantalla */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ top: '64px' }}
        >
          {/* Overlay de fondo */}
          <div
            className="absolute inset-0 backdrop-blur-xl"
            style={{
              backgroundColor: 'rgba(3, 6, 20, 0.98)',
              height: 'calc(100vh - 64px)'
            }}
          >
            {/* Contenido del menú centrado */}
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              <Link
                href="/propiedades"
                className={`text-lg font-medium tracking-[1px] uppercase transition-colors ${
                  isActivePage("/propiedades")
                    ? "text-vibrant-orange"
                    : "text-white hover:text-vibrant-orange"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Propiedades
              </Link>
              <Link
                href="/agentes"
                className={`text-lg font-medium tracking-[1px] uppercase transition-colors ${
                  isActivePage("/agentes")
                    ? "text-vibrant-orange"
                    : "text-white hover:text-vibrant-orange"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Agentes
              </Link>
              <Link
                href="/contacto"
                className={`text-lg font-medium tracking-[1px] uppercase transition-colors ${
                  isActivePage("/contacto")
                    ? "text-vibrant-orange"
                    : "text-white hover:text-vibrant-orange"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}