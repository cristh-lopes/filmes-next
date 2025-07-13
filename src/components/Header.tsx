"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-white font-bold text-xl">CineFlix</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Início
            </Link>
            <Link 
              href="/compatibilidade" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Compatibilidade
            </Link>
            <Link 
              href="/filmes" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Filmes
            </Link>
            <Link 
              href="/series" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Séries
            </Link>
          </nav>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200">
              Entrar
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/compatibilidade" 
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Compatibilidade
              </Link>
              <Link 
                href="/filmes" 
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Filmes
              </Link>
              <Link 
                href="/series" 
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Séries
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 