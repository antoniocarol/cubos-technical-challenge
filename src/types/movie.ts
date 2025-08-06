// Base Movie type from TMDB API
export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  genre_ids: number[]
  original_language: string
  video: boolean
}

// Movie Details type for individual movie page
export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  runtime: number | null
  budget: number
  revenue: number
  genres: Genre[]
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string | null
  homepage: string | null
  imdb_id: string | null
}

// Genre type
export interface Genre {
  id: number
  name: string
}

// Production Company type
export interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

// Production Country type
export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

// Spoken Language type
export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

// API Response types
export interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

// Search and Filter types
export interface SearchFilters {
  query?: string
  genre?: string
  year?: string
  sortBy?: 'popularity.desc' | 'popularity.asc' | 'release_date.desc' | 'release_date.asc' | 'vote_average.desc' | 'vote_average.asc'
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalResults: number
}

// Movie Images types
export interface MovieImage {
  aspect_ratio: number
  file_path: string
  height: number
  width: number
  vote_average: number
  vote_count: number
}

export interface MovieImagesResponse {
  id: number
  backdrops: MovieImage[]
  posters: MovieImage[]
  logos: MovieImage[]
}

// Movie Videos types
export interface MovieVideo {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
  published_at: string
  size: number
}

export interface MovieVideosResponse {
  id: number
  results: MovieVideo[]
}

// Similar Movies types
export interface SimilarMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}