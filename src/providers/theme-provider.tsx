'use client'

import { useEffect, useState } from 'react'
import { useThemeStore } from '@/stores'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const root = window.document.documentElement
    
    // Remove both classes first
    root.classList.remove('light', 'dark')
    
    // Add the current theme class
    root.classList.add(theme)
  }, [theme, mounted])

  // Prevent flash of unstyled content
  if (!mounted) {
    return <div className="dark">{children}</div>
  }

  return <>{children}</>
}