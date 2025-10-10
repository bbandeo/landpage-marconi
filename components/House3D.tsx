"use client";

import { useEffect } from "react";

/**
 * House3D Component
 *
 * Modelo 3D de una casa hecho completamente en CSS puro.
 * Código original sin modificar de /public/imported/3dhousemodel/
 *
 * Este componente carga el modelo 3D usando un iframe y hace el fondo transparente.
 */
export function House3D() {
  useEffect(() => {
    // Hacer el fondo del iframe transparente una vez cargado
    const iframe = document.querySelector('iframe[title="3D House Model"]') as HTMLIFrameElement;

    if (iframe) {
      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            // Quitar el background-color del body
            const body = iframeDoc.querySelector('body');
            if (body) {
              (body as HTMLElement).style.backgroundColor = 'transparent';
            }
          }
        } catch (e) {
          console.log('No se pudo acceder al iframe debido a políticas CORS');
        }
      };
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
      <iframe
        src="/imported/3dhousemodel/index.html"
        className="w-full h-full border-0"
        title="3D House Model"
        style={{
          pointerEvents: "auto",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
