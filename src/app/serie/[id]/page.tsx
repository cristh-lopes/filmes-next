"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import type { TvShowDetails } from "@/types/Tmdb";

export default function TvShowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<'overview' | 'seasons' | 'cast' | 'videos' | 'similar'>('overview');
  const { data: tvShow, error, loading } = useFetch<TvShowDetails>(`/series/${id}`);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não disponível";
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando detalhes da série...</p>
        </div>
      </div>
    );
  }

  if (error || !tvShow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Erro ao carregar série</h1>
          <p className="text-gray-400 mb-6">Tente novamente mais tarde</p>
          <Link 
            href="/"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900">
      {/* Hero Section with Backdrop */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {tvShow.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
            alt={tvShow.name}
            width={1200}
            height={400}
            className="object-cover w-full h-full"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link 
            href="/"
            className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-all duration-200 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Voltar</span>
          </Link>
        </div>

        {/* TvShow Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-end">
            {/* Poster */}
            <div className="relative w-48 h-72 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                width={192}
                height={288}
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Title and Basic Info */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{tvShow.name}</h1>
              {tvShow.tagline && (
                <p className="text-xl text-gray-300 mb-4 italic">&quot;{tvShow.tagline}&quot;</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                <span className="bg-yellow-500 text-black px-2 py-1 rounded font-semibold">
                  ⭐ {tvShow.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300">
                  {formatDate(tvShow.first_air_date)}
                </span>
                <span className="text-gray-300">
                  {tvShow.number_of_seasons} temporada{tvShow.number_of_seasons > 1 ? 's' : ''}
                </span>
                <span className="text-gray-300">
                  {tvShow.genres?.map(genre => genre.name).join(', ')}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tvShow.genres?.slice(0, 3).map(genre => (
                  <span 
                    key={genre.id}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-1 mb-6">
              <div className="flex space-x-1 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Sinopse', icon: '📖' },
                  { id: 'seasons', label: 'Temporadas', icon: '📺' },
                  { id: 'cast', label: 'Elenco', icon: '🎭' },
                  { id: 'videos', label: 'Vídeos', icon: '🎬' },
                  { id: 'similar', label: 'Similares', icon: '🔍' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'seasons' | 'cast' | 'videos' | 'similar')}
                    className={`flex-shrink-0 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Sinopse</h2>
                  <p className="text-gray-300 leading-relaxed mb-6">{tvShow.overview}</p>
                  
                  {tvShow.created_by && tvShow.created_by.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Criado por</h3>
                      <p className="text-gray-300">{tvShow.created_by.map(creator => creator.name).join(', ')}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Status</h3>
                      <p className="text-gray-300">{tvShow.status}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Tipo</h3>
                      <p className="text-gray-300">{tvShow.type}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seasons' && tvShow.seasons && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Temporadas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tvShow.seasons.map(season => (
                      <div key={season.id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          {season.poster_path && (
                            <div className="relative w-16 h-24 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                                alt={season.name}
                                width={64}
                                height={96}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">{season.name}</h4>
                            <p className="text-gray-400 text-sm">{season.episode_count} episódios</p>
                            {season.air_date && (
                              <p className="text-gray-400 text-sm">{formatDate(season.air_date)}</p>
                            )}
                          </div>
                        </div>
                        {season.overview && (
                          <p className="text-gray-300 text-sm mt-3 line-clamp-3">{season.overview}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'cast' && tvShow.credits?.cast && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Elenco Principal</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tvShow.credits.cast.slice(0, 8).map(actor => (
                      <div key={actor.id} className="bg-white/5 rounded-lg p-4 text-center">
                        {actor.profile_path ? (
                          <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                            <Image
                              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                              alt={actor.name}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="text-gray-400 text-2xl">👤</span>
                          </div>
                        )}
                        <h4 className="text-white font-semibold text-sm">{actor.name}</h4>
                        <p className="text-gray-400 text-xs">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'videos' && tvShow.videos?.results && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Vídeos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tvShow.videos.results
                      .filter(video => video.site === 'YouTube' && video.type === 'Trailer')
                      .slice(0, 4)
                      .map(video => (
                        <div key={video.id} className="bg-white/5 rounded-lg overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.key}`}
                            title={video.name}
                            className="w-full h-48"
                            allowFullScreen
                          ></iframe>
                          <div className="p-4">
                            <h4 className="text-white font-semibold">{video.name}</h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === 'similar' && tvShow.similar?.results && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Séries Similares</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tvShow.similar.results.slice(0, 8).map(similarShow => (
                      <Link 
                        key={similarShow.id} 
                        href={`/serie/${similarShow.id}`}
                        className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="relative w-full h-48">
                          <Image
                            src={`https://image.tmdb.org/t/p/w300${similarShow.poster_path}`}
                            alt={similarShow.name}
                            width={120}
                            height={180}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="text-white font-semibold text-sm line-clamp-2">{similarShow.name}</h4>
                          <p className="text-gray-400 text-xs mt-1">
                            ⭐ {similarShow.vote_average.toFixed(1)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Avaliação</span>
                  <span className="text-yellow-400 font-semibold">⭐ {tvShow.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Votos</span>
                  <span className="text-white font-semibold">{tvShow.vote_count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Popularidade</span>
                  <span className="text-white font-semibold">{Math.round(tvShow.popularity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Temporadas</span>
                  <span className="text-white font-semibold">{tvShow.number_of_seasons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Episódios</span>
                  <span className="text-white font-semibold">{tvShow.number_of_episodes}</span>
                </div>
              </div>
            </div>

            {/* Network Info */}
            {tvShow.networks && tvShow.networks.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Rede</h3>
                <div className="space-y-3">
                  {tvShow.networks.map(network => (
                    <div key={network.id} className="flex items-center space-x-3">
                      {network.logo_path ? (
                        <div className="relative w-8 h-8">
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                            alt={network.name}
                            width={32}
                            height={32}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">📺</span>
                        </div>
                      )}
                      <span className="text-gray-300 text-sm">{network.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {tvShow.spoken_languages && tvShow.spoken_languages.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Idiomas</h3>
                <div className="flex flex-wrap gap-2">
                  {tvShow.spoken_languages.map(lang => (
                    <span 
                      key={lang.iso_639_1}
                      className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-300"
                    >
                      {lang.english_name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 