"use client";

import Image from "next/image";
import type { MovieTmdb } from "@/types/Tmdb";
import type { User } from "@/types/Compatibility";

interface MovieRatingCardProps {
  movie: MovieTmdb;
  user1: User;
  user2: User;
  user1Rating: number;
  user2Rating: number;
  onRating: (movieId: number, rating: number, userId: string) => void;
  onNext: () => void;
  canNext: boolean;
  isLastRound: boolean;
}

export default function MovieRatingCard({
  movie,
  user1,
  user2,
  user1Rating,
  user2Rating,
  onRating,
  onNext,
  canNext,
  isLastRound
}: MovieRatingCardProps) {
  const StarRating = ({ 
    rating, 
    onRating, 
    userId, 
    userName, 
    userColor 
  }: {
    rating: number;
    onRating: (rating: number) => void;
    userId: string;
    userName: string;
    userColor: string;
  }) => {
    const isNotWatched = rating === -1;
    
    return (
      <div className="text-center">
        <h3 className={`text-lg font-semibold mb-3 ${userColor}`}>{userName}</h3>
        
        {/* Opção "Nunca vi" */}
        <div className="mb-4">
          <button
            onClick={() => onRating(-1)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isNotWatched
                ? 'bg-red-500 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            👁️ Nunca vi
          </button>
        </div>
        
        {/* Estrelas de avaliação */}
        <div className="flex justify-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRating(star)}
              disabled={isNotWatched}
              className={`text-2xl transition-all duration-200 hover:scale-110 ${
                isNotWatched 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : star <= rating 
                  ? 'text-yellow-400 hover:text-yellow-300' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        
        <p className="text-sm text-gray-300">
          {isNotWatched 
            ? 'Não assistiu ao filme' 
            : rating > 0 
            ? `${rating} estrela${rating > 1 ? 's' : ''}` 
            : 'Clique para avaliar'
          }
        </p>
      </div>
    );
  };

  const getCompatibilityText = (user1Rating: number, user2Rating: number) => {
    if (user1Rating === -1 || user2Rating === -1) {
      return "Um dos usuários não assistiu ao filme";
    }
    
    const difference = Math.abs(user1Rating - user2Rating);
    const compatibility = 100 - difference * 20;
    
    if (difference === 0) return "Perfeita compatibilidade! 🎉";
    if (difference <= 1) return "Muito boa compatibilidade! 😊";
    if (difference <= 2) return "Compatibilidade moderada 🤔";
    return "Compatibilidade baixa 😅";
  };

  const getCompatibilityPercentage = (user1Rating: number, user2Rating: number) => {
    if (user1Rating === -1 || user2Rating === -1) {
      return "N/A";
    }
    return `${100 - Math.abs(user1Rating - user2Rating) * 20}%`;
  };

  const canShowCompatibility = user1Rating !== 0 && user2Rating !== 0;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
      {/* Movie Info */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-shrink-0">
          <div className="relative w-48 h-72 rounded-lg overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Avaliação:</span>
              <span className="text-yellow-400 ml-2">⭐ {movie.vote_average.toFixed(1)}</span>
            </div>
            <div>
              <span className="text-gray-400">Data de Lançamento:</span>
              <span className="text-white ml-2">
                {new Date(movie.release_date).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <StarRating
          rating={user1Rating}
          onRating={(rating) => onRating(movie.id, rating, user1.id)}
          userId={user1.id}
          userName={user1.name}
          userColor="text-pink-400"
        />
        
        <StarRating
          rating={user2Rating}
          onRating={(rating) => onRating(movie.id, rating, user2.id)}
          userId={user2.id}
          userName={user2.name}
          userColor="text-blue-400"
        />
      </div>

      {/* Compatibility Preview */}
      {canShowCompatibility && (
        <div className="bg-white/10 rounded-lg p-4 mb-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Compatibilidade neste filme:</h3>
          <div className="text-3xl font-bold text-green-400">
            {getCompatibilityPercentage(user1Rating, user2Rating)}
          </div>
          <p className="text-gray-300 text-sm mt-2">
            {getCompatibilityText(user1Rating, user2Rating)}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!canNext}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
            canNext
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLastRound ? 'Ver Resultados' : 'Próximo Filme'}
        </button>
      </div>
    </div>
  );
} 