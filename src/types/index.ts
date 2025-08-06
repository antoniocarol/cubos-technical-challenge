// Re-export all types from individual files
export * from './movie'

// Global/Common types
export interface ApiError {
  message: string
  status_code?: number
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

// Theme types
export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}
