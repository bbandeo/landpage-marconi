"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (dimensions.width === 0) return

    const createParticles = () => {
      const newParticles: Particle[] = []
      const colors = ['#f97316', '#ea580c', '#9a3412', '#fb923c', '#fed7aa']
      
      for (let i = 0; i < 60; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      setParticles(newParticles)
    }

    createParticles()
  }, [dimensions])

  useEffect(() => {
    if (particles.length === 0) return

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY

          // Bounce off edges
          if (newX <= 0 || newX >= dimensions.width) {
            newX = newX <= 0 ? dimensions.width : 0
          }
          if (newY <= 0 || newY >= dimensions.height) {
            newY = newY <= 0 ? dimensions.height : 0
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        })
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [particles.length, dimensions])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      
      {/* Líneas conectoras entre partículas */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((particle, index) => {
          const nearbyParticles = particles.filter((p, i) => {
            if (i === index) return false
            const distance = Math.sqrt(
              Math.pow(p.x - particle.x, 2) + Math.pow(p.y - particle.y, 2)
            )
            return distance < 150
          })

          return nearbyParticles.map((nearbyParticle, nearbyIndex) => (
            <line
              key={`${index}-${nearbyIndex}`}
              x1={particle.x}
              y1={particle.y}
              x2={nearbyParticle.x}
              y2={nearbyParticle.y}
              stroke="#f97316"
              strokeWidth="0.5"
              opacity="0.2"
            />
          ))
        })}
      </svg>
    </div>
  )
}
