"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header, MoviesGrid } from "@/components/layout";
import {
  SimplePagination,
  SearchBar,
  FilterDropdown,
  FilterPanel,
} from "@/components/ui";
import {
  usePopularMovies,
  useSearchMovies,
  useDiscoverMovies,
  useDebounce,
} from "@/hooks";
import { Movie, SearchFilters } from "@/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Use search query if available, otherwise show popular movies
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchMovies(debouncedSearchQuery, currentPage);

  const {
    data: popularMovies,
    isLoading: isPopularLoading,
    error: popularError,
  } = usePopularMovies(currentPage);

  const {
    data: filteredMovies,
    isLoading: isFilteredLoading,
    error: filteredError,
  } = useDiscoverMovies(filters, currentPage);

  // Determine which data to show
  const isSearching = debouncedSearchQuery.length > 0;
  const hasFilters = Object.keys(filters).some(
    (key) => filters[key as keyof SearchFilters]
  );

  let currentData, isLoading, error;

  if (isSearching) {
    currentData = searchResults;
    isLoading = isSearchLoading;
    error = searchError;
  } else if (hasFilters) {
    currentData = filteredMovies;
    isLoading = isFilteredLoading;
    error = filteredError;
  } else {
    currentData = popularMovies;
    isLoading = isPopularLoading;
    error = popularError;
  }

  // Limit to exactly 10 movies for 2×5 grid layout
  const movies = (currentData?.results || []).slice(0, 10);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMovieClick = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterPanelToggle = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Erro ao carregar filmes
            </h2>
            <p className="text-muted-foreground max-w-md mb-4">
              Não foi possível carregar os filmes. Verifique sua conexão e tente
              novamente.
            </p>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-xs hover:bg-primary/90"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Main Layout
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col px-5 lg:px-8 py-6 gap-6">
        {/* Search and Filter Section */}
        <section className="max-w-2xl w-full mx-auto">
          <div className="flex gap-2 mb-2">
            <SearchBar onSearch={handleSearch} className="flex-1" />
            <FilterDropdown
              onToggle={handleFilterPanelToggle}
              isOpen={isFilterPanelOpen}
            />
          </div>

          <FilterPanel
            isOpen={isFilterPanelOpen}
            filters={filters} // Pass current filters
            onFiltersChange={handleFiltersChange}
          />
        </section>

        {/* Movies Section */}
        <section className="flex-1 flex flex-col gap-6">
          <MoviesGrid
            movies={movies}
            isLoading={isLoading}
            onMovieClick={handleMovieClick}
          />

          {/* Pagination */}
          {!isLoading && movies.length > 0 && currentData && (
            <SimplePagination
              currentPage={currentPage}
              totalPages={currentData.total_pages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/20 border-t border-border/50 py-6 text-center text-sm text-foreground/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4" style={{ color: "#B5B2BC" }}>
          2025 © Todos os direitos reservados a Cubos Movies
        </div>
      </footer>
    </div>
  );
}
