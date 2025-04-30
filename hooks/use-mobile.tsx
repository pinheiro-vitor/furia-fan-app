"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Verificar se está no cliente
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Verificar inicialmente
      checkIfMobile()

      // Adicionar listener para redimensionamento
      window.addEventListener("resize", checkIfMobile)

      // Limpar listener
      return () => window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}
