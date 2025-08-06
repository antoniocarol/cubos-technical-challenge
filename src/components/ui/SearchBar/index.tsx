'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from '../Input'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ onSearch, placeholder = "Pesquisar por filmes", className }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    // Real-time search as user types
    onSearch?.(value)
  }

  return (
    <form 
      onSubmit={handleSearchSubmit}
      className={cn("w-full max-w-2xl mx-auto relative z-10 px-4 sm:px-0 max-lg:px-0", className)}
    >
      
        <Image 
          src="/assets/search.svg" 
          alt="Search" 
          width={20} 
          height={20} 
          className="absolute right-8 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 max-lg:right-4" 
          style={{ filter: 'invert(1) opacity(0.7)' }}
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-4 pr-12 sm:pr-10 h-12 bg-black/20 border-white/20 text-white placeholder-white/70 focus:border-[var(--color-primary-default)] focus:ring-[var(--color-primary-default)] rounded-xs text-base relative z-10 backdrop-blur-sm"
        />
  
    </form>
  )
}