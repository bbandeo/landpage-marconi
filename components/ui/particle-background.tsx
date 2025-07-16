"use client"

import { useEffect } from "react"

export function ParticleBackground() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.position = "absolute"
      particle.style.background = "rgba(249, 115, 22, 0.1)"
      particle.style.borderRadius = "50%"
      particle.style.pointerEvents = "none"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDuration = Math.random() * 3 + 2 + "s"
      particle.style.opacity = (Math.random() * 0.5 + 0.1).toString()
      particle.style.width = particle.style.height = Math.random() * 10 + 5 + "px"

      document.body.appendChild(particle)

      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove()
        }
      }, 5000)
    }

    const interval = setInterval(createParticle, 300)
    return () => clearInterval(interval)
  }, [])

  return null
}
