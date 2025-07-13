"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { MovieTmdb, tmdbRequest } from "@/types/Tmdb";
import type { CompatibilityGame, User } from "@/types/Compatibility";
import MovieRatingCard from "./MovieRatingCard";
import CompatibilityResults from "./CompatibilityResults";
import UserSetup from "./UserSetup";

interface CompatibilityGameProps {
  user1: User;
  user2: User;
}

export default function CompatibilityGame({ user1, user2 }: CompatibilityGameProps) {
  const [currentRound, setCurrentRound] = useState(1);
  const [gameResults, setGameResults] = useState<any[]>([]);
  const [gameStatus, setGameStatus] = useState<'setup' | 'playing' | 'completed'>('setup');
  const [user1Ratings, setUser1Ratings] = useState<Record<number, number>>({});
  const [user2Ratings, setUser2Ratings] = useState<Record<number, number>>({});
  const [currentUser1, setCurrentUser1] = useState<User>(user1);
  const [currentUser2, setCurrentUser2] = useState<User>(user2);

  const { data: movies, loading } = useFetch<tmdbRequest<MovieTmdb>>("/filmes?type=popular");

  const totalRounds = 10;
  const currentMovies = movies?.results?.slice(0, totalRounds) || [];

  const handleRating = (movieId: number, rating: number, userId: string) => {
    if (userId === currentUser1.id) {
      setUser1Ratings(prev => ({ ...prev, [movieId]: rating }));
    } else {
      setUser2Ratings(prev => ({ ...prev, [movieId]: rating }));
    }
  };

  const calculateCompatibility = () => {
    const results = currentMovies.map(movie => {
      const user1Rating = user1Ratings[movie.id] || 0;
      const user2Rating = user2Ratings[movie.id] || 0;
      
      // Se ambos não viram o filme, não conta para compatibilidade
      if (user1Rating === -1 && user2Rating === -1) {
        return {
          movie,
          user1Rating,
          user2Rating,
          compatibility: null,
          status: 'both_not_watched'
        };
      }
      
      // Se apenas um não viu, não conta para compatibilidade
      if (user1Rating === -1 || user2Rating === -1) {
        return {
          movie,
          user1Rating,
          user2Rating,
          compatibility: null,
          status: 'one_not_watched'
        };
      }
      
      // Se um dos dois não avaliou, não conta
      if (user1Rating === 0 || user2Rating === 0) {
        return null;
      }
      
      const compatibility = 100 - Math.abs(user1Rating - user2Rating) * 20;
      
      return {
        movie,
        user1Rating,
        user2Rating,
        compatibility: Math.max(0, compatibility),
        status: 'rated'
      };
    }).filter(Boolean);

    return results;
  };

  const startGame = (newUser1: User, newUser2: User) => {
    setCurrentUser1(newUser1);
    setCurrentUser2(newUser2);
    setGameStatus('playing');
  };

  const completeGame = () => {
    const results = calculateCompatibility();
    setGameResults(results);
    setGameStatus('completed');
  };

  const canComplete = () => {
    const ratedMovies = currentMovies.filter(movie => {
      const user1Rating = user1Ratings[movie.id] || 0;
      const user2Rating = user2Ratings[movie.id] || 0;
      
      // Conta se ambos avaliaram (incluindo "nunca vi")
      return user1Rating !== 0 && user2Rating !== 0;
    });
    
    return ratedMovies.length >= Math.min(5, totalRounds);
  };

  if (gameStatus === 'setup') {
    return (
      <UserSetup onStart={startGame} />
    );
  }

  if (gameStatus === 'completed') {
    return (
      <CompatibilityResults 
        user1={currentUser1}
        user2={currentUser2}
        results={gameResults}
        onPlayAgain={() => {
          setGameStatus('setup');
          setUser1Ratings({});
          setUser2Ratings({});
          setGameResults([]);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando filmes...</p>
        </div>
      </div>
    );
  }

  const currentMovie = currentMovies[currentRound - 1];
  const user1Rating = user1Ratings[currentMovie?.id] || 0;
  const user2Rating = user2Ratings[currentMovie?.id] || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Jogo de Compatibilidade</h1>
          <p className="text-gray-200 mb-4">
            Rodada {currentRound} de {totalRounds}
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Movie */}
        {currentMovie && (
          <MovieRatingCard
            movie={currentMovie}
            user1={currentUser1}
            user2={currentUser2}
            user1Rating={user1Rating}
            user2Rating={user2Rating}
            onRating={handleRating}
            onNext={() => {
              if (currentRound < totalRounds) {
                setCurrentRound(currentRound + 1);
              } else {
                completeGame();
              }
            }}
            canNext={user1Rating !== 0 && user2Rating !== 0}
            isLastRound={currentRound === totalRounds}
          />
        )}

        {/* Progress */}
        <div className="mt-8 grid grid-cols-5 md:grid-cols-10 gap-2">
          {currentMovies.slice(0, totalRounds).map((movie, index) => {
            const user1Rating = user1Ratings[movie.id] || 0;
            const user2Rating = user2Ratings[movie.id] || 0;
            const isCompleted = user1Rating !== 0 && user2Rating !== 0;
            const isCurrent = index + 1 === currentRound;
            
            return (
              <div
                key={movie.id}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isCurrent 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 