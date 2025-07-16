"use client"

import { useMemo } from "react"

export function ParticleBackground() {
  const particles = useMemo(() => Array.from({ length: 25 }), [])

  return (
    <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 1
        const animation = `float-${(i % 3) + 1}`
        const style = {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`,
        }
        return <div key={i} className={`absolute rounded-full bg-orange-500/10 animate-${animation}`} style={style} />
      })}
    </div>
  )
}
