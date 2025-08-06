import Image from 'next/image'
import { useState } from 'react'
import { Movie } from '@/types'
import { getImageUrl } from '@/services/api'
import { cn } from '@/lib/utils'

interface MovieCardProps {
  movie: Movie
  onClick?: (movie: Movie) => void
  className?: string
}

export function MovieCard({ movie, onClick, className }: MovieCardProps) {
  const [imageError, setImageError] = useState(false)
  
  const handleClick = () => {
    onClick?.(movie)
  }

  const formatRating = (rating: number) => {
    return Math.round(rating * 10) // Convert 6.7 to 67%
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const genres = {
   28: 'Ação',
   12: 'Aventura',
   16: 'Animação',
   35: 'Comédia',
   80: 'Crime',
   99: 'Documentário',
   18: 'Drama',
   10751: 'Família',
   14: 'Fantasia',
   36: 'História',
   27: 'Horror',
   10402: 'Música',
   9648: 'Mistério',
   10749: 'Romance',
   878: 'Ficção científica',
   10770: 'Filme de televisão',
   53: 'Suspense',
   10752: 'Guerra',
   37: 'Faroeste',
  }

  return (
    <div
      className={cn(
        "group relative cursor-pointer rounder-xs overflow-hidden transition-all duration-700 hover:scale-[1.005] hover:shadow-2xl bg-card",
        className
      )}
      onClick={handleClick}
    >
      {!imageError && movie.poster_path ? (
        <Image
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          fill
          className="object-cover transition-all duration-300"
          sizes="(max-width: 414px) 50vw, (max-width: 768px) 33vw, (max-width: 1366px) 20vw, 16vw"
          onError={handleImageError}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs">Sem imagem</p>
          </div>
        </div>
      )}
      
      {/* Rating Circle - Professional design matching provided SVG */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="relative w-24 h-24">
          <svg
            width="98" 
            height="98" 
            viewBox="0 0 98 98" 
            fill="none" 
            className="w-24 h-24 transform -rotate-90"
          >
            {/* Background blur circle */}
            <circle 
              cx="49" 
              cy="49" 
              r="49" 
              fill="#121113" 
              fillOpacity="0.7"
            />
            
            {/* Outer border ring */}
            <circle 
              cx="49" 
              cy="49" 
              r="46" 
              stroke="white" 
              strokeWidth="6" 
              strokeOpacity="0.27"
              fill="none"
            />
            
            {/* Progress circle */}
            <circle
              cx="49"
              cy="49"
              r="46"
              stroke="#FFE000"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 46}`}
              strokeDashoffset={`${2 * Math.PI * 46 * (1 - movie.vote_average / 10)}`}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          
          {/* Rating text overlay */}
          <div className="absolute inset-0 flex flex-row items-center justify-center">
            <span className="text-yellow-400 text-lg font-medium leading-none">
              {formatRating(movie.vote_average)}
            </span>
            <span className="text-white text-xs font-medium leading-none">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Movie Title - Enhanced bottom shadow overlay */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Smooth gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
        
        {/* Text content with additional shadows */}
        <div className="relative p-4 text-white">
          <h3 className="font-semibold text-base leading-tight line-clamp-2 mb-2" style={{ 
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.7)' 
          }}>
            {movie.title.toUpperCase()}
          </h3>
          <p className="text-gray-200 text-sm hidden group-hover:block transition-all duration-700" style={{ 
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.6)' 
          }}>
            {movie.genre_ids
              .slice(0, 2)
              .map((genre) => genres[genre as keyof typeof genres])
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>
      </div>
    </div>
  )
}

// Loading Skeleton Component
export function MovieCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      "rounder-xs overflow-hidden relative movie-card bg-card",
      className
    )}>
      <div className="absolute inset-0 bg-muted animate-pulse rounder-xs">
        {/* Simulate rating circle */}
        <div className="absolute top-3 left-3 w-14 h-14 bg-muted-foreground/20 rounded-full animate-pulse" />
        {/* Simulate title overlay area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="h-4 bg-muted-foreground/30 rounded animate-pulse mb-2" />
          <div className="h-3 bg-muted-foreground/20 rounded animate-pulse w-1/2" />
        </div>
      </div>
    </div>
  )
}