import { Movie } from '@/types'
import { MovieCard, MovieCardSkeleton } from '@/components/ui'
import { cn } from '@/lib/utils'
import '@/styles/movies-grid.css'

interface MoviesGridProps {
  movies: Movie[]
  isLoading?: boolean
  onMovieClick?: (movie: Movie) => void
  className?: string
}

export function MoviesGrid({ 
  movies, 
  isLoading = false, 
  onMovieClick, 
  className 
}: MoviesGridProps) {
  
  if (isLoading) {
    return (
      <div className={cn("movies-grid-skeleton", className)}>
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center ">
        <div className="w-16 h-16 bg-mauve-3 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-mauve-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 8v8m6-8v8"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-mauve-12 mb-2">
          Nenhum filme encontrado
        </h3>
        <p className="text-mauve-10 max-w-md">
          Tente ajustar seus filtros ou termos de busca para encontrar o que você está procurando.
        </p>
      </div>
    )
  }

  return (
    <div className={cn("movies-grid-container", className)}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
          className="movie-card"
        />
      ))}
    </div>
  )
}

// Loading state component for the entire grid
export function MoviesGridSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("movies-grid-skeleton", className)}>
      {Array.from({ length: 10 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  )
}