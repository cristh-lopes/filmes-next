"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { TvShowTmdb, tmdbRequest } from "@/types/Tmdb";
import TvShowCard from "@/components/TvShowCard";
import Link from "next/link";

type TvShowType = "popular" | "on_the_air" | "top_rated" | "airing_today";

export default function SeriesPage() {
  const [currentType, setCurrentType] = useState<TvShowType>("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce para busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // URL para buscar séries
  const getApiUrl = () => {
    if (debouncedQuery) {
      return `/series?query=${encodeURIComponent(debouncedQuery)}&page=${currentPage}`;
    }
    return `/series?type=${currentType}&page=${currentPage}`;
  };

  const { data: tvShowsData, loading, error } = useFetch<tmdbRequest<TvShowTmdb>>(getApiUrl());

  const tvShowTypes = [
    { id: "popular", label: "Populares", icon: "🔥" },
    { id: "on_the_air", label: "No Ar", icon: "📺" },
    { id: "top_rated", label: "Mais Bem Avaliadas", icon: "⭐" },
    { id: "airing_today", label: "Exibindo Hoje", icon: "📅" },
  ];

  const handleTypeChange = (type: TvShowType) => {
    setCurrentType(type);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = tvShowsData?.total_pages || 1;
  const currentResults = tvShowsData?.results || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                📺 Catálogo de Séries
              </h1>
              <p className="text-gray-300">
                Descubra milhares de séries incríveis
              </p>
            </div>
            <Link
              href="/"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
            >
              ← Voltar ao Início
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtros e Busca */}
        <div className="mb-8 space-y-6">
          {/* Barra de Busca */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar séries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filtros de Tipo */}
          {!debouncedQuery && (
            <div className="flex flex-wrap gap-2">
              {tvShowTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeChange(type.id as TvShowType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentType === type.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 backdrop-blur-md text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          )}

          {/* Resultados da Busca */}
          {debouncedQuery && (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <p className="text-white">
                Resultados para: <span className="font-semibold text-purple-400">&quot;{debouncedQuery}&quot;</span>
              </p>
              <p className="text-gray-300 text-sm mt-1">
                {tvShowsData?.total_results || 0} séries encontradas
              </p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white text-lg">Carregando séries...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Erro ao carregar séries</h2>
            <p className="text-gray-400 mb-6">Tente novamente mais tarde</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Grid de Séries */}
        {!loading && !error && currentResults.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {currentResults.map((tvShow) => (
                <TvShowCard key={tvShow.id} tvShow={tvShow} />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
                  }`}
                >
                  ← Anterior
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/10 backdrop-blur-md text-gray-300 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
                  }`}
                >
                  Próximo →
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && currentResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-2xl font-bold text-white mb-4">Nenhuma série encontrada</h2>
            <p className="text-gray-400 mb-6">
              {debouncedQuery 
                ? `Não encontramos séries para &quot;${debouncedQuery}&quot;`
                : "Tente ajustar os filtros ou buscar por outro termo"
              }
            </p>
            {debouncedQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                Limpar Busca
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 