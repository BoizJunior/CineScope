'use client';

import { useRef, useState } from 'react';
import { Movie } from '@/lib/tmdb';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLargeRow?: boolean;
  onMovieClick: (movie: Movie) => void;
}

export default function MovieRow({ title, movies, isLargeRow = false, onMovieClick }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2 mb-8 px-4 md:px-12 pt-4">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      
      <div className="group relative md:-ml-2">
        <ChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll no-scrollbar md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              className={`relative cursor-pointer transition transform duration-300 hover:scale-105 hover:opacity-100 ${
                isLargeRow ? 'h-28 min-w-[180px] md:h-36 md:min-w-[260px]' : 'h-28 min-w-[100px] md:h-44 md:min-w-[140px]' // Adjusted sizes for poster vs backdrop
              }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  isLargeRow ? movie.backdrop_path : movie.poster_path
                }`}
                className="rounded-sm object-cover w-full h-full"
                alt={movie.title || movie.name}
              />
            </div>
          ))}
        </div>

        <ChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}
