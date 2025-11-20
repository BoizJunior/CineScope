'use client';

import { useState, useEffect, useRef } from 'react';
import { Movie, fetchMovieDetails, MovieDetails } from '@/lib/tmdb';
import { Play, Info, Heart } from 'lucide-react';

interface HeroProps {
  movies: Movie[];
  onPlayClick: (movie: Movie) => void;
}

export default function Hero({ movies, onPlayClick }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Limit to first 5 movies for the carousel
  const carouselMovies = movies.slice(0, 5);
  const currentMovie = carouselMovies[currentIndex];

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleNextMovie = () => {
    setCurrentIndex((prev) => (prev === carouselMovies.length - 1 ? 0 : prev + 1));
    resetTimeout();
  };

  const handlePrevMovie = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselMovies.length - 1 : prev - 1));
    resetTimeout();
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      handleNextMovie();
    }, 8000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, carouselMovies.length]);

  // Fetch details when current movie changes
  useEffect(() => {
    const getDetails = async () => {
      if (currentMovie) {
        const details = await fetchMovieDetails(currentMovie.id);
        setMovieDetails(details);
      }
    };
    getDetails();
  }, [currentMovie]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    resetTimeout();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 50) {
      handleNextMovie();
    }

    if (deltaX < -50) {
      handlePrevMovie();
    }
  };

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  if (!currentMovie) return null;

  return (
    <div 
      className="relative w-full h-[75vh] md:h-[85vh] bg-[#141414] overflow-hidden mb-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full md:flex md:justify-end">
        <div className="relative w-full h-full md:w-[65%]">
          <img
            key={currentMovie.id}
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
            alt={currentMovie.title || currentMovie.name}
            className="w-full h-full object-cover animate-fade-in md:[mask-image:linear-gradient(to_left,black_60%,transparent_100%)]"
          />
          {/* Mobile Gradient Overlay (Strong Bottom Fade) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent md:hidden" />
          {/* Desktop Bottom Fade (to match background) */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="absolute bottom-0 left-0 w-full z-10 pb-12 px-4 md:static md:inset-0 md:flex md:items-center md:h-full md:pb-0 md:px-12">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 md:mb-4 uppercase leading-tight drop-shadow-xl">
              {currentMovie.title || currentMovie.name}
            </h1>

            {/* Badges */}
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-3 md:mb-4 text-xs md:text-sm font-medium flex-wrap">
              <span className="text-yellow-400 border border-yellow-400 px-1.5 py-0.5 md:px-2 rounded bg-yellow-400/10">
                IMDb {currentMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-300 border border-gray-600 px-1.5 py-0.5 md:px-2 rounded">
                {currentMovie.release_date?.split('-')[0] || currentMovie.first_air_date?.split('-')[0] || '2024'}
              </span>
              <span className="text-gray-300 border border-gray-600 px-1.5 py-0.5 md:px-2 rounded">
                FHD
              </span>
              {movieDetails?.runtime && (
                <span className="text-gray-300 border border-gray-600 px-1.5 py-0.5 md:px-2 rounded">
                  {formatRuntime(movieDetails.runtime)}
                </span>
              )}
            </div>

            {/* Genres */}
            {movieDetails?.genres && (
              <div className="text-gray-300 text-xs md:text-sm font-medium mb-4 md:mb-6">
                {movieDetails.genres.slice(0, 3).map((g) => g.name).join(' • ')}
              </div>
            )}

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-lg mb-6 md:mb-8 line-clamp-3 leading-relaxed max-w-xl mx-auto md:mx-0">
              {currentMovie.overview}
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mb-8 md:mb-0">
              <button 
                onClick={() => onPlayClick(currentMovie)}
                className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-yellow-400 flex items-center justify-center hover:scale-110 transition shadow-[0_0_20px_rgba(250,204,21,0.5)] group"
              >
                <Play className="w-6 h-6 md:w-8 md:h-8 fill-black text-black ml-1" />
              </button>
              
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/10 active:scale-75"
              >
                <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
              </button>
              
              <button className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition border border-white/10">
                <Info className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Navigation (Bottom Right) */}
      <div className="absolute bottom-10 right-4 md:right-12 z-30 hidden md:flex gap-3">
        {carouselMovies.map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => handleThumbnailClick(index)}
            className={`relative cursor-pointer transition-all duration-300 aspect-[2/3] rounded-sm overflow-hidden ${
              index === currentIndex
                ? 'w-20 border-2 border-yellow-400 shadow-lg z-10'
                : 'w-16 opacity-60 hover:opacity-100 hover:scale-105'
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
