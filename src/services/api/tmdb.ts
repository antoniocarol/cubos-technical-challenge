import axios from 'axios'
import { MovieDetails, MoviesResponse, Genre, SearchFilters, MovieImagesResponse, MovieVideosResponse, SimilarMoviesResponse } from '@/types'

// TMDB API configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

if (!TMDB_API_KEY) {
  throw new Error('TMDB API key is required. Please set NEXT_PUBLIC_TMDB_API_KEY in your environment variables.')
}

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'pt-BR',
  },
})

// TMDB API Service
export const tmdbService = {
  // Get popular movies (default for homepage)
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page }
    })
    return response.data
  },

  // Search movies by query
  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get('/search/movie', {
      params: { 
        query, 
        page,
        include_adult: false 
      }
    })
    return response.data
  },

  // Discover movies with filters
  discoverMovies: async (filters: SearchFilters, page: number = 1): Promise<MoviesResponse> => {
    const params: Record<string, string | number | boolean> = {
      page,
      include_adult: false,
    }

    if (filters.genre) {
      params.with_genres = filters.genre
    }

    if (filters.year) {
      params.primary_release_year = filters.year
    }

    if (filters.sortBy) {
      params.sort_by = filters.sortBy
    }

    const response = await tmdbApi.get('/discover/movie', { params })
    return response.data
  },

  // Get movie details by ID
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await tmdbApi.get(`/movie/${movieId}`)
    return response.data
  },

  // Get movie genres
  getGenres: async (): Promise<Genre[]> => {
    const response = await tmdbApi.get('/genre/movie/list')
    return response.data.genres
  },

  // Get movie images
  getMovieImages: async (movieId: number): Promise<MovieImagesResponse> => {
    const response = await tmdbApi.get(`/movie/${movieId}/images`)
    return response.data
  },

  // Get movie videos (trailers)
  getMovieVideos: async (movieId: number): Promise<MovieVideosResponse> => {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`)
    return response.data
  },

  // Get similar movies
  getSimilarMovies: async (movieId: number, page: number = 1): Promise<SimilarMoviesResponse> => {
    const response = await tmdbApi.get(`/movie/${movieId}/similar`, {
      params: { page }
    })
    return response.data
  },
}

// Helper function to build image URLs
export const getImageUrl = (path: string | null, size: 'w500' | 'w780' | 'original' = 'w500'): string => {
  if (!path) return '' // Return empty string - components will handle fallback
  return `https://image.tmdb.org/t/p/${size}${path}`
}