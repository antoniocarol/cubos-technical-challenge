import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { tmdbService } from '@/services/api'
import { SearchFilters } from '@/types'

// Hook for popular movies (default homepage)
export function usePopularMovies(page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => tmdbService.getPopularMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  })
}

// Hook for movie search
export function useSearchMovies(query: string, page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => tmdbService.searchMovies(query, page),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  })
}

// Hook for discover movies with filters
export function useDiscoverMovies(filters: SearchFilters, page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'discover', filters, page],
    queryFn: () => tmdbService.discoverMovies(filters, page),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  })
}

// Hook for movie details
export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => tmdbService.getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10, // 10 minutes for details
    gcTime: 1000 * 60 * 60, // 1 hour
  })
}

// Hook for movie genres
export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => tmdbService.getGenres(),
    staleTime: 1000 * 60 * 60, // 1 hour - genres don't change often
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}

// Hook for movie images
export function useMovieImages(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'images'],
    queryFn: () => tmdbService.getMovieImages(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30, // 30 minutes - images don't change often
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
  })
}

// Hook for movie videos (trailers)
export function useMovieVideos(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => tmdbService.getMovieVideos(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30, // 30 minutes - videos don't change often
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
  })
}

// Hook for similar movies
export function useSimilarMovies(movieId: number, page: number = 1) {
  return useQuery({
    queryKey: ['movie', movieId, 'similar', page],
    queryFn: () => tmdbService.getSimilarMovies(movieId, page),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })
}

// Hook for infinite scroll (if needed later)
export function useInfiniteMovies(filters?: SearchFilters, query?: string) {
  return useInfiniteQuery({
    queryKey: ['movies', 'infinite', filters, query],
    queryFn: ({ pageParam = 1 }) => {
      if (query) {
        return tmdbService.searchMovies(query, pageParam)
      }
      if (filters) {
        return tmdbService.discoverMovies(filters, pageParam)
      }
      return tmdbService.getPopularMovies(pageParam)
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  })
}