"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useMovieDetails, useMovieVideos } from "@/hooks";
import { getImageUrl } from "@/services/api";
import { CircularRating } from "@/components/ui";
import { Header } from "@/components/layout";

export default function MovieDetailsPage() {
  const [imageError, setImageError] = useState(false);
  const [backdropError, setBackdropError] = useState(false);
  const params = useParams();
  const movieId = parseInt(params.id as string);

  const { data: movie, isLoading, error } = useMovieDetails(movieId);
  const { data: videos } = useMovieVideos(movieId);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const calculateProfit = (revenue: number, budget: number) => {
    if (revenue > 0 && budget > 0) {
      return revenue - budget;
    }
    return 0;
  };

  const getMainLanguage = (
    languages: { iso_639_1: string; name: string }[]
  ) => {
    return (
      languages.find((lang) => lang.iso_639_1 === movie?.original_language)
        ?.name || "Inglês"
    );
  };

  const getTrailerVideo = () => {
    if (!videos?.results) return null;
    return (
      videos.results.find(
        (video) =>
          video.site === "YouTube" && video.type === "Trailer" && video.official
      ) ||
      videos.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      ) ||
      videos.results.find((video) => video.site === "YouTube")
    );
  };

  const trailer = getTrailerVideo();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-6 py-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                  <div className="aspect-[2/3] bg-mauve-3 rounded-xs" />
                </div>
                <div className="lg:col-span-8 space-y-6">
                  <div className="h-8 bg-mauve-3 rounded w-3/4" />
                  <div className="h-4 bg-mauve-3 rounded w-1/2" />
                  <div className="space-y-2">
                    <div className="h-4 bg-mauve-3 rounded" />
                    <div className="h-4 bg-mauve-3 rounded" />
                    <div className="h-4 bg-mauve-3 rounded w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Filme não encontrado
            </h2>
            <p className="text-gray-300 mb-6">
              O filme solicitado não foi encontrado ou não está disponível.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const profit = calculateProfit(movie.revenue, movie.budget);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content - Full screen backdrop */}
      <div className="flex-1 relative overflow-hidden">
        {/* Backdrop Image */}
        {movie.backdrop_path && !backdropError ? (
          <div className="absolute inset-0">
            <Image
              src={getImageUrl(movie.backdrop_path, "original")}
              alt={movie.title}
              fill
              className="object-cover"
              onError={() => setBackdropError(true)}
              priority
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-8 flex gap-7 lg:flex-row max-lg:flex-col">
        <div className="lg:w-4/12 max-lg:w-full max-lg:max-w-md max-lg:mx-auto">
            
              {!imageError && movie.poster_path ? (
                <Image
                  src={getImageUrl(movie.poster_path, "w780")}
                  alt={movie.title}
                  width={400}
                  height={800}
                  className="object-cover w-full h-full lg:min-w-96"
                  sizes="320px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center text-gray-400">
                    <svg
                      className="w-16 h-16 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm">Poster não disponível</p>
                  </div>
                </div>
              )}
         
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Side - Movie Poster */}

            {/* Right Side - All Content */}
            <div className="flex-1 space-y-6 lg:max-w-4xl w-full">
              {/* Title Section */}
              <div className="flex justify-between max-lg:flex-col">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {movie.title}
                  </h1>
                  {movie.title !== movie.original_title && (
                    <p className="text-base text-gray-400 mb-2">
                      Título original: {movie.original_title}
                    </p>
                  )}
                  <p className="text-base italic text-gray-300 mb-4">
                    {movie.tagline}
                  </p>
                </div>
                <div className="flex max-h-20 max-lg:max-h-1/2 min-w-96 justify-evenly max-lg:justify-normal max-lg:gap-2.5">
                  <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-4 max-lg:w-4/12">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                      POPULARIDADE
                    </p>
                    <p className="text-xl font-bold text-white">
                      {Math.round(movie.popularity).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-4 relative max-lg:w-4/12">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                      VOTOS
                    </p>
                    <p className="text-xl font-bold text-white">
                      {movie.vote_count.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <CircularRating rating={movie.vote_average} />
                </div>
              </div>

              {/* Two Column Layout for Stats and Synopsis */}
              <div className="flex gap-8 max-lg:flex-col w-full">
              <div className="flex-1 space-y-6 lg:max-w-[500px] max-lg:w-full">
                  {/* Synopsis */}
                  <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-4 w-full break-words">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                      SINOPSE
                    </h3>
                    <p className="text-base text-white/90 leading-relaxed">
                      {movie.overview || "Sinopse não disponível."}
                    </p>
                  </div>

                  {/* Genres */}
                  <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                      Gêneros
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-4 py-2 text-sm font-medium rounded-"
                          style={{
                            backgroundColor: "rgba(139, 92, 246, 0.2)",
                            color: "#c4b5fd",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                          }}
                        >
                          {genre.name.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Left Column - Stats Grid */}
                <div className="flex-shrink-0 w-full lg:w-auto">
                  {/* Stats Grid - 2x3 Layout with Rating Circle */}
                  <div className="grid grid-cols-2 gap-3 w-full lg:max-w-[440px]">
                    {/* Row 2: Release Date | Runtime */}
                    <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                        LANÇAMENTO
                      </p>
                      <p className="text-xl font-bold text-white">
                        {new Date(movie.release_date).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                    </div>

                    <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                        DURAÇÃO
                      </p>
                      <p className="text-xl font-bold text-white">
                        {movie.runtime ? formatRuntime(movie.runtime) : "N/A"}
                      </p>
                    </div>

                    {/* Row 3: Status | Language */}
                    <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                        SITUAÇÃO
                      </p>
                      <p className="text-xl font-bold text-white">
                        {movie.status === "Released" ? "Lançado" : movie.status}
                      </p>
                    </div>

                    <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                        IDIOMA
                      </p>
                      <p className="text-xl font-bold text-white">
                        {getMainLanguage(movie.spoken_languages)}
                      </p>
                    </div>
                  </div>

                  {/* Financial Info - Below Stats Grid */}
                  {(movie.budget > 0 || movie.revenue > 0) && (
                    <div className="grid grid-cols-3 gap-3 mt-6 w-full lg:max-w-[440px]">
                      {movie.budget > 0 && (
                        <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-3">
                          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                            ORÇAMENTO
                          </p>
                          <p className="text-lg font-bold text-white">
                            {formatCurrency(movie.budget)}
                          </p>
                        </div>
                      )}

                      {movie.revenue > 0 && (
                        <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-3">
                          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                            RECEITA
                          </p>
                          <p className="text-lg font-bold text-white">
                            {formatCurrency(movie.revenue)}
                          </p>
                        </div>
                      )}

                      {profit > 0 && (
                        <div className="bg-boxes backdrop-blur-sm border border-white/10 rounded-xs p-3">
                          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                            LUCRO
                          </p>
                          <p className="text-lg font-bold text-white">
                            {formatCurrency(profit)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Column - Synopsis and Genres */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailer && (
        <div className="bg-black py-8">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-6">Trailer</h2>
            <div className="aspect-video bg-black rounded-xs overflow-hidden  mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black/90 border-t border-gray-300/15 py-6 text-center text-sm text-gray-400">
        <div className="max-w-7xl mx-auto px-4">
          2025 © Todos os direitos reservados a Cubos Movies
        </div>
      </footer>
    </div>
  );
}
