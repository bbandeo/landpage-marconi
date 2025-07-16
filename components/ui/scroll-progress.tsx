"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [width, setWidth] = useState(0)

  const scrollHeight = () => {
    const el = document.documentElement
    const scrollTop = el.scrollTop || document.body.scrollTop
    const scrollHeight = el.scrollHeight || document.body.scrollHeight
    const percent = (scrollTop / (scrollHeight - el.clientHeight)) * 100
    setWidth(percent)
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight)
    return () => window.removeEventListener("scroll", scrollHeight)
  }, [])

  return (
    <div
      style={{ transform: `scaleX(${width / 100})` }}
      className="fixed top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 to-orange-400 transform-origin-left z-[100] transition-transform duration-150"
    />
  )
}
