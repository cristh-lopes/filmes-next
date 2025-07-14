"use client";

import { useFetch } from "@/hooks/useFetch";
import type { MovieTmdb, tmdbRequest } from "@/types/Tmdb";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { data, loading } = useFetch<tmdbRequest<MovieTmdb>>("/filmes?type=popular");

  if (loading || !data?.results?.length) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-96 h-56 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const featuredMovie = data.results[0];

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
          alt={featuredMovie.title}
          width={1200}
          height={400}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {featuredMovie.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 line-clamp-3">
              {featuredMovie.overview}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                              <Link
                  href={`/filme/${featuredMovie.id}`}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center"
                >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Ver Detalhes
              </Link>
              <button className="bg-black/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-black/70 transition-all duration-200 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Favoritar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
} 