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

export function MoviesGrid({ movies, isLoading, onMovieClick, className }: MoviesGridProps) {
  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 movies-grid-container", className)}>
        {Array.from({ length: 10 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-center movies-grid-container">
        <div>
          <h3 className="text-lg font-semibold mb-2">Nenhum filme encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar seus filtros</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 movies-grid-container", className)}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  )
}
