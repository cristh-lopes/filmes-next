"use client";

import { useState } from "react";
import type { User } from "@/types/Compatibility";

interface UserSetupProps {
  onStart: (user1: User, user2: User) => void;
}

export default function UserSetup({ onStart }: UserSetupProps) {
  const [user1Name, setUser1Name] = useState("João");
  const [user2Name, setUser2Name] = useState("Maria");

  const handleStart = () => {
    if (!user1Name.trim() || !user2Name.trim()) {
      alert("Por favor, insira os nomes dos dois usuários!");
      return;
    }

    const newUser1: User = {
      id: "1",
      name: user1Name.trim(),
      email: `${user1Name.toLowerCase().replace(/\s+/g, '')}@example.com`,
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
      name: user2Name.trim(),
      email: `${user2Name.toLowerCase().replace(/\s+/g, '')}@example.com`,
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

    onStart(newUser1, newUser2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">🎬 Jogo de Compatibilidade</h1>
        <p className="text-xl text-gray-200 mb-8 text-center">
          Configure os nomes dos jogadores para começar!
        </p>
        
        <div className="space-y-6 mb-8">
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Jogador 1</h3>
            <input
              type="text"
              value={user1Name}
              onChange={(e) => setUser1Name(e.target.value)}
              placeholder="Digite o nome do primeiro jogador"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Jogador 2</h3>
            <input
              type="text"
              value={user2Name}
              onChange={(e) => setUser2Name(e.target.value)}
              placeholder="Digite o nome do segundo jogador"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Como funciona:</h3>
          <ul className="text-gray-200 text-left space-y-2">
            <li>• Vocês avaliarão 10 filmes juntos</li>
            <li>• Dê notas de 1 a 5 estrelas para cada filme</li>
            <li>• Selecione &quot;Nunca vi&quot; se não assistiu ao filme</li>
            <li>• O sistema calculará sua compatibilidade</li>
            <li>• Receberão recomendações personalizadas</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStart}
            disabled={!user1Name.trim() || !user2Name.trim()}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 text-lg ${
              user1Name.trim() && user2Name.trim()
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Começar Jogo
          </button>
        </div>
      </div>
    </div>
  );
} 