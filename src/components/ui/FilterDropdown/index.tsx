'use client'

import Image from 'next/image'
import { Button } from '../Button'
import { cn } from '@/lib/utils'

interface FilterDropdownProps {
  onToggle: () => void
  isOpen: boolean
  className?: string
}

export function FilterDropdown({ onToggle, isOpen, className }: FilterDropdownProps) {
  return (
    <div className={cn("", className)}>
      {/* Filter Toggle Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={onToggle}
        className={cn(
          "p-3 py-6  text-white border-white/20 rounded-xs backdrop-blur-sm transition-all duration-200 ml-2",
          isOpen && "bg-pagination-default"
        )}
      >
        <Image 
          src="/assets/filter.svg" 
          alt="Filter" 
          width={24} 
          height={24} 
          style={{ filter: 'invert(1)' }}
        />
        <span className="sr-only">Filtros</span>
      </Button>
    </div>
  )
}