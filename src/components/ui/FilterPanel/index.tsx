'use client'

import { useGenres } from '@/hooks'
import { SearchFilters } from '@/types'
import { X } from 'lucide-react'

interface FilterPanelProps {
  isOpen: boolean
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

export function FilterPanel({ isOpen, filters, onFiltersChange }: FilterPanelProps) {
  const { data: genres } = useGenres()
  
  // Parse genres from comma-separated string
  const selectedGenres = filters.genre ? filters.genre.split(',') : []
  
  const handleGenreToggle = (genreId: string) => {
    const newGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId]
    
    onFiltersChange({
      ...filters,
      genre: newGenres.length > 0 ? newGenres.join(',') : undefined
    })
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value
    onFiltersChange({
      ...filters,
      year: year || undefined
    })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value as SearchFilters['sortBy']
    onFiltersChange({
      ...filters,
      sortBy: sortBy || undefined
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasFilters = Boolean(selectedGenres.length > 0 || filters.year || filters.sortBy)

  if (!isOpen) return null

  return (
    <div className="w-full max-w-2xl bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-4 lg:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
          FILTROS
        </h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Limpar tudo
          </button>
        )}
      </div>

      {/* Filters Grid - Responsive */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        
        {/* Genres - Scrollable chips */}
        <div className="flex-1">
          <label className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 block">
            Gênero
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {genres?.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreToggle(genre.id.toString())}
                className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                  selectedGenres.includes(genre.id.toString())
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-black/20 border-white/10 text-gray-300 hover:border-white/20'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Year and Sort - Side by side on desktop, stacked on mobile */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:w-64">
          
          {/* Year Input */}
          <div className="flex-1">
            <label className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 block">
              Ano
            </label>
            <input
              type="number"
              placeholder="2024"
              min="1900"
              max={new Date().getFullYear()}
              value={filters.year || ''}
              onChange={handleYearChange}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xs text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex-1">
            <label className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 block">
              Ordenar
            </label>
            <select
              value={filters.sortBy || ''}
              onChange={handleSortChange}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xs text-white focus:border-purple-500 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="">Padrão</option>
              <option value="popularity.desc">Mais Popular</option>
              <option value="popularity.asc">Menos Popular</option>
              <option value="release_date.desc">Mais Recente</option>
              <option value="release_date.asc">Mais Antigo</option>
              <option value="vote_average.desc">Melhor Avaliado</option>
              <option value="vote_average.asc">Pior Avaliado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasFilters && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {selectedGenres.map(genreId => {
              const genre = genres?.find(g => g.id === parseInt(genreId))
              return genre ? (
                <span key={genreId} className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                  {genre.name}
                  <button onClick={() => handleGenreToggle(genreId)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : null
            })}
            {filters.year && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                {filters.year}
                <button onClick={() => onFiltersChange({ ...filters, year: undefined })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.sortBy && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                {filters.sortBy.includes('desc') ? '↓' : '↑'} Ordenado
                <button onClick={() => onFiltersChange({ ...filters, sortBy: undefined })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}