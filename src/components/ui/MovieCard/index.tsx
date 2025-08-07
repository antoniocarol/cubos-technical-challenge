import Image from "next/image";
import { useState } from "react";
import { Movie } from "@/types";
import { getImageUrl } from "@/services/api";
import { cn } from "@/lib/utils";
import { CircularRating } from "../CircularRating";
interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  className?: string;
}
const GENRES = {
  28: "Ação",
  12: "Aventura",
  16: "Animação",
  35: "Comédia",
  80: "Crime",
  99: "Documentário",
  18: "Drama",
  10751: "Família",
  14: "Fantasia",
  36: "História",
  27: "Horror",
  10402: "Música",
  9648: "Mistério",
  10749: "Romance",
  878: "Ficção científica",
  10770: "Filme de televisão",
  53: "Suspense",
  10752: "Guerra",
  37: "Faroeste",
};

export function MovieCard({ movie, onClick, className }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const rating = Math.round(movie.vote_average);

  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 bg-card",
        "aspect-[2/3]",
        className
      )}
      onClick={() => onClick?.(movie)}
    >
      {!imageError && movie.poster_path ? (
        <Image
          src={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={false}
          unoptimized={true}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <div className="absolute pb-10 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
        <CircularRating rating={rating} size={120}/>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        <h3 className="font-semibold text-white line-clamp-2">
          {movie.title.toUpperCase()}
        </h3>
        <p className="text-gray-300 text-sm hidden group-hover:block transition-opacity">
          {movie.genre_ids
            .slice(0, 2)
            .map((id) => GENRES[id as keyof typeof GENRES])
            .filter(Boolean)
            .join(", ")}
        </p>
      </div>
    </div>
  );
}

export function MovieCardSkeleton({ className }: MovieCardSkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-card aspect-[2/3] rounded-xs group",
        className
      )}
    >
      <div className="absolute inset-0 bg-muted">
        <div className="shimmer" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        <div className="h-5 bg-gray-400/30 rounded mb-2" />
        <div className="h-4 bg-gray-400/20 rounded w-1/2" />
      </div>
    </div>
  );
}

interface MovieCardSkeletonProps {
  className?: string;
}