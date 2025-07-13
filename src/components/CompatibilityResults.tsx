"use client";

import Image from "next/image";
import type { User } from "@/types/Compatibility";

interface CompatibilityResultsProps {
  user1: User;
  user2: User;
  results: any[];
  onPlayAgain: () => void;
}

export default function CompatibilityResults({
  user1,
  user2,
  results,
  onPlayAgain
}: CompatibilityResultsProps) {
  // Filtrar apenas resultados com compatibilidade calculada
  const ratedResults = results.filter(result => result.compatibility !== null);
  
  const overallCompatibility = ratedResults.length > 0 
    ? Math.round(ratedResults.reduce((sum, result) => sum + result.compatibility, 0) / ratedResults.length)
    : 0;

  const getCompatibilityMessage = (score: number) => {
    if (score >= 90) return "Alma Gêmea Cinematográfica! 🎭💕";
    if (score >= 80) return "Muito Compatíveis! 😍";
    if (score >= 70) return "Boa Compatibilidade! 😊";
    if (score >= 60) return "Compatibilidade Moderada 🤔";
    if (score >= 50) return "Compatibilidade Baixa 😅";
    return "Incompatíveis Cinematográficos 😱";
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getRatingDisplay = (rating: number) => {
    if (rating === -1) return "👁️ Nunca vi";
    if (rating === 0) return "Não avaliado";
    return `${rating} ⭐`;
  };

  const bestMatch = ratedResults.length > 0 
    ? ratedResults.reduce((best, current) => 
        current.compatibility > best.compatibility ? current : best
      )
    : null;

  const worstMatch = ratedResults.length > 0 
    ? ratedResults.reduce((worst, current) => 
        current.compatibility < worst.compatibility ? current : worst
      )
    : null;

  const notWatchedCount = results.filter(result => 
    result.user1Rating === -1 || result.user2Rating === -1
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🎬 Resultados da Compatibilidade</h1>
          <p className="text-xl text-gray-200">
            Descubra o quão compatíveis são seus gostos cinematográficos!
          </p>
        </div>

        {/* Overall Compatibility */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Compatibilidade Geral</h2>
          {ratedResults.length > 0 ? (
            <>
              <div className={`text-6xl font-bold mb-4 ${getCompatibilityColor(overallCompatibility)}`}>
                {overallCompatibility}%
              </div>
              <p className="text-xl text-gray-200 mb-6">
                {getCompatibilityMessage(overallCompatibility)}
              </p>
            </>
          ) : (
            <div className="text-2xl text-gray-300 mb-6">
              Não há filmes avaliados para calcular compatibilidade
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-pink-400 mb-2">{user1.name}</h3>
              <p className="text-gray-300">Jogador 1</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">{user2.name}</h3>
              <p className="text-gray-300">Jogador 2</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">{ratedResults.length}</div>
              <div className="text-gray-300">Filmes Avaliados</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-400">{notWatchedCount}</div>
              <div className="text-gray-300">Não Vistos</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">{results.length}</div>
              <div className="text-gray-300">Total de Filmes</div>
            </div>
          </div>
        </div>

        {/* Best and Worst Matches */}
        {ratedResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Best Match */}
            {bestMatch && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">🎉 Melhor Compatibilidade</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-16 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${bestMatch.movie.poster_path}`}
                      alt={bestMatch.movie.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{bestMatch.movie.title}</h4>
                    <p className="text-green-400 font-bold">{bestMatch.compatibility}%</p>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  <p><span className="text-pink-400">{user1.name}:</span> {getRatingDisplay(bestMatch.user1Rating)}</p>
                  <p><span className="text-blue-400">{user2.name}:</span> {getRatingDisplay(bestMatch.user2Rating)}</p>
                </div>
              </div>
            )}

            {/* Worst Match */}
            {worstMatch && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4">😅 Menor Compatibilidade</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-16 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${worstMatch.movie.poster_path}`}
                      alt={worstMatch.movie.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{worstMatch.movie.title}</h4>
                    <p className="text-red-400 font-bold">{worstMatch.compatibility}%</p>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  <p><span className="text-pink-400">{user1.name}:</span> {getRatingDisplay(worstMatch.user1Rating)}</p>
                  <p><span className="text-blue-400">{user2.name}:</span> {getRatingDisplay(worstMatch.user2Rating)}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detailed Results */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Resultados Detalhados</h3>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={result.movie.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <div className="relative w-12 h-18 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${result.movie.poster_path}`}
                    alt={result.movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{result.movie.title}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-pink-400">{user1.name}: {getRatingDisplay(result.user1Rating)}</span>
                    <span className="text-blue-400">{user2.name}: {getRatingDisplay(result.user2Rating)}</span>
                    {result.compatibility !== null ? (
                      <span className={`font-bold ${getCompatibilityColor(result.compatibility)}`}>
                        {result.compatibility}%
                      </span>
                    ) : (
                      <span className="text-gray-400 font-bold">
                        {result.status === 'both_not_watched' ? 'Ambos não viram' : 'Um não viu'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">💡 Recomendações</h3>
          <div className="space-y-4 text-gray-200">
            {ratedResults.length === 0 ? (
              <p>🎬 Vocês não avaliaram filmes suficientes para gerar recomendações. Tente jogar novamente!</p>
            ) : (
              <>
                {overallCompatibility >= 80 && (
                  <p>🎬 Vocês têm gostos muito similares! Podem assistir praticamente qualquer filme juntos.</p>
                )}
                {overallCompatibility >= 60 && overallCompatibility < 80 && (
                  <p>🎬 Vocês têm boa compatibilidade! Foquem em filmes de ação e comédia que geralmente agradam a todos.</p>
                )}
                {overallCompatibility < 60 && (
                  <p>🎬 Vocês têm gostos diferentes, mas isso pode ser divertido! Tentem filmes que misturam seus gêneros favoritos.</p>
                )}
                {notWatchedCount > 0 && (
                  <p>👁️ Vocês têm {notWatchedCount} filmes que não viram. Que tal assistirem juntos?</p>
                )}
                <p>💕 Lembrem-se: a diversidade de gostos pode tornar suas sessões de cinema mais interessantes!</p>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-x-4">
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
          >
            Jogar Novamente
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
} 