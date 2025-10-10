"use client";

/**
 * House3D Component
 *
 * Modelo 3D de una casa hecho completamente en CSS puro.
 * Código original sin modificar de /public/imported/3dhousemodel/
 *
 * Este componente carga el modelo 3D usando un iframe para no modificar el código original.
 */
export function House3D() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
      <iframe
        src="/imported/3dhousemodel/index.html"
        className="w-full h-full border-0 bg-transparent"
        title="3D House Model"
        style={{
          pointerEvents: "auto",
        }}
      />
    </div>
  );
}
