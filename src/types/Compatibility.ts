export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  ratings: MovieRating[];
  createdAt: Date;
}

export interface UserPreferences {
  favoriteGenres: number[];
  favoriteActors: string[];
  favoriteDirectors: string[];
  preferredDecades: string[];
  watchTime: 'short' | 'medium' | 'long';
  moodPreferences: string[];
}

export interface MovieRating {
  movieId: number;
  rating: number; // 1-5 stars
  watched: boolean;
  wouldWatch: boolean;
  comment?: string;
  timestamp: Date;
}

export interface CompatibilityScore {
  overall: number; // 0-100
  genres: number;
  actors: number;
  directors: number;
  ratings: number;
  watchTime: number;
  mood: number;
}

export interface Couple {
  id: string;
  user1: User;
  user2: User;
  compatibility: CompatibilityScore;
  sharedPreferences: SharedPreferences;
  recommendations: MovieRecommendation[];
  createdAt: Date;
}

export interface SharedPreferences {
  commonGenres: number[];
  commonActors: string[];
  commonDirectors: string[];
  averageRating: number;
  watchTimePreference: 'short' | 'medium' | 'long';
}

import type { MovieTmdb } from './Tmdb';

export interface MovieRecommendation {
  movie: MovieTmdb;
  compatibilityScore: number;
  reasons: string[];
  bothLiked: boolean;
  predictedRating: number;
}

export interface CompatibilityGame {
  id: string;
  couple: Couple;
  currentRound: number;
  totalRounds: number;
  moviesToRate: MovieTmdb[];
  results: GameResult[];
  status: 'active' | 'completed';
}

export interface GameResult {
  round: number;
  movie: MovieTmdb;
  user1Rating: number;
  user2Rating: number;
  compatibility: number;
  timestamp: Date;
} 