'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { useThemeStore } from '@/stores'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-gray-300/15",
      className
    )} style={{backgroundColor: '#121113'}}>
      <div className="max-w-[97vw] mx-auto flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/assets/Cubos-logo.svg" alt="Logo" width={100} height={100} priority={false}/>
            <span className="text-white text-sm hidden md:inline-block ml-1">
              Movies
            </span>
          </Link>

            <Button
              variant="secondary"
              size="lg"
              onClick={toggleTheme}
              className="p-4 bg-[var(--color-secondary-default)] hover:bg-[var(--color-secondary-hover)] text-white border-transparent rounder-xs backdrop-blur-sm transition-all duration-200 flex items-center gap-3"
            >
              {theme === 'dark' ? (
                <Image 
                  src="/assets/sun.svg" 
                  alt="Light mode" 
                  width={24} 
                  height={24} 
                  style={{ filter: 'invert(1)' }}
                />
              ) : (
                <Image 
                  src="/assets/moon.svg" 
                  alt="Dark mode" 
                  width={24} 
                  height={24} 
                  style={{ filter: 'invert(1)' }}
                />
              )}
              <span className="sr-only">Alternar tema</span>
            </Button>
          </div>
    </header>
  )
}