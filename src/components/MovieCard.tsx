"use client";

import Image from "next/image";
import type { MovieTmdb } from "@/types/Tmdb";
import Link from "next/link";

interface MovieCardProps {
  movie: MovieTmdb;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não disponível";
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="group relative block w-full aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <Link href={`/movie/${movie.id}`}>
        {/* Imagem */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          fill
          priority
        />
        
        {/* Overlay com informações */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">{movie.title}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">{movie.overview}</p>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-yellow-400 font-semibold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-400">
                {formatDate(movie.release_date)}
              </span>
            </div>
          </div>
        </div>

        {/* Badge de avaliação */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-yellow-400 text-xs font-bold">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Botão de favorito */}
        <button className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
