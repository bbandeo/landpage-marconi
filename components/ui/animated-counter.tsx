"use client"

import { useEffect, useRef } from "react"
import { useInView, animate } from "framer-motion"

type AnimatedCounterProps = {
  from?: number
  to: number
  animationOptions?: any
  suffix?: string
}

export function AnimatedCounter({ from = 0, to, suffix = "", animationOptions }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView && ref.current) {
      const node = ref.current
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        ...animationOptions,
        onUpdate(value) {
          node.textContent = Math.round(value).toLocaleString()
        },
      })
      return () => controls.stop()
    }
  }, [from, to, animationOptions, inView])

  return (
    <>
      <span ref={ref}>{from}</span>
      {suffix}
    </>
  )
}
