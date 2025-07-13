"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import CompatibilityGame from "@/components/CompatibilityGame";
import { useFetch } from "@/hooks/useFetch";
import type { MovieTmdb, tmdbRequest } from "@/types/Tmdb";
import type { User } from "@/types/Compatibility";

export default function Home() {
  const [showCompatibilityGame, setShowCompatibilityGame] = useState(false);
  const [user1, setUser1] = useState<User | null>(null);
  const [user2, setUser2] = useState<User | null>(null);

  const { data: popularMovies, error: popularError, loading: popularLoading } = useFetch<tmdbRequest<MovieTmdb>>("/filmes?type=popular");
  const { data: topRatedMovies, error: topRatedError, loading: topRatedLoading } = useFetch<tmdbRequest<MovieTmdb>>("/filmes?type=top_rated");
  const { data: upcomingMovies, error: upcomingError, loading: upcomingLoading } = useFetch<tmdbRequest<MovieTmdb>>("/filmes?type=upcoming");

  const startCompatibilityGame = () => {
    // Criar usuários de exemplo (serão substituídos pelo UserSetup)
    const newUser1: User = {
      id: "1",
      name: "Jogador 1",
      email: "jogador1@example.com",
      preferences: {
        favoriteGenres: [28, 35, 12],
        favoriteActors: [],
        favoriteDirectors: [],
        preferredDecades: ["2010s", "2020s"],
        watchTime: "medium",
        moodPreferences: ["ação", "comédia", "aventura"]
      },
      ratings: [],
      createdAt: new Date()
    };

    const newUser2: User = {
      id: "2",
      name: "Jogador 2",
      email: "jogador2@example.com",
      preferences: {
        favoriteGenres: [35, 10749, 18],
        favoriteActors: [],
        favoriteDirectors: [],
        preferredDecades: ["2010s", "2020s"],
        watchTime: "medium",
        moodPreferences: ["romance", "comédia", "drama"]
      },
      ratings: [],
      createdAt: new Date()
    };

    setUser1(newUser1);
    setUser2(newUser2);
    setShowCompatibilityGame(true);
  };

  if (showCompatibilityGame && user1 && user2) {
    return (
      <CompatibilityGame user1={user1} user2={user2} />
    );
  }

  if (popularError || topRatedError || upcomingError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Erro ao carregar dados</h1>
          <p className="text-gray-400">Tente novamente mais tarde</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Compatibility Game Section */}
      <section className="py-16 bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🎭 Jogo de Compatibilidade
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Descubra o quão compatíveis são seus gostos cinematográficos! 
              Avaliem filmes juntos e vejam sua taxa de compatibilidade.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">✨ Novas Funcionalidades:</h3>
              <ul className="text-gray-200 text-left space-y-2">
                <li>• Configure os nomes dos jogadores</li>
                <li>• Opção "Nunca vi" para filmes não assistidos</li>
                <li>• Sistema de compatibilidade aprimorado</li>
                <li>• Recomendações personalizadas</li>
              </ul>
            </div>
            <button
              onClick={startCompatibilityGame}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 text-lg"
            >
              🎬 Começar Jogo de Compatibilidade
            </button>
          </div>
        </div>
      </section>
      
      {/* Seções de Filmes */}
      <div className="space-y-8">
        {/* Filmes Populares */}
        {!popularLoading && popularMovies?.results && (
          <Carousel 
            movies={popularMovies.results} 
            title="🎬 Filmes Populares" 
            type="featured"
          />
        )}

        {/* Filmes Mais Bem Avaliados */}
        {!topRatedLoading && topRatedMovies?.results && (
          <Carousel 
            movies={topRatedMovies.results} 
            title="⭐ Filmes Mais Bem Avaliados"
          />
        )}

        {/* Filmes que Vão Estrear */}
        {!upcomingLoading && upcomingMovies?.results && (
          <Carousel 
            movies={upcomingMovies.results} 
            title="📅 Em Breve"
          />
        )}
      </div>

      {/* Loading States */}
      {(popularLoading || topRatedLoading || upcomingLoading) && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-white">Carregando filmes...</p>
          </div>
        </div>
      )}
    </main>
  );
}
