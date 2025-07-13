"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { MovieTmdb } from "@/types/Tmdb";
import MovieCard from "./MovieCard";

interface CarouselProps {
  movies: MovieTmdb[];
  title: string;
  type?: "default" | "featured";
}

export default function Carousel({ movies, title, type = "default" }: CarouselProps) {
  const isFeatured = type === "featured";

  return (
    <section className={`w-full py-12 ${isFeatured ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          <div className="flex items-center space-x-2">
            <button className="swiper-button-prev-custom p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="swiper-button-next-custom p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination-custom',
            bulletClass: 'swiper-pagination-bullet-custom',
            bulletActiveClass: 'swiper-pagination-bullet-active-custom'
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="pb-8">
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="swiper-pagination-custom flex justify-center mt-6 space-x-2"></div>
      </div>
    </section>
  );
}
