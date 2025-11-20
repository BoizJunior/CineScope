'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Bell, X } from 'lucide-react';
import Link from 'next/link';
import { Movie, searchMovies } from '@/lib/tmdb';

interface NavbarProps {
  onSearchSelect?: (movie: Movie) => void;
}

export default function Navbar({ onSearchSelect }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    if (!query.trim()) {
      setResults([]);
      return;
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      const searchResults = await searchMovies(query);
      setResults(searchResults.slice(0, 5));
    }, 500);
  }, [query]);

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setQuery('');
    setResults([]);
  };

  const handleResultClick = (movie: Movie) => {
    if (onSearchSelect) onSearchSelect(movie);
    handleCloseSearch();
  };

  return (
    <>
      {/* Overlay */}
      {isSearchActive && (
        <div 
          className="fixed inset-0 bg-black/90 z-40 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseSearch}
        />
      )}

      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled || isSearchActive 
            ? 'bg-[#141414]' 
            : 'bg-transparent bg-gradient-to-b from-black/70 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 md:px-8 h-16">
          
          {/* Logo & Nav - Hidden when searching on mobile */}
          <div className={`flex items-center gap-8 ${isSearchActive ? 'hidden md:flex' : 'flex'}`}>
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold text-[#E50914] tracking-wider cursor-pointer">
                CineScope
              </h1>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition font-light">Home</a>
              <a href="#" className="hover:text-white transition font-light">TV Shows</a>
              <a href="#" className="hover:text-white transition font-light">Movies</a>
              <a href="#" className="hover:text-white transition font-light">New & Popular</a>
              <a href="#" className="hover:text-white transition font-light">My List</a>
            </nav>
          </div>

          {/* Search Container */}
          <div className={`flex items-center ${isSearchActive ? 'w-full md:w-auto flex-1 md:flex-none justify-center' : 'gap-6'}`}>
            
            {isSearchActive ? (
              <div className="relative w-full md:w-96 flex items-center animate-slide-in">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Titles, people, genres"
                  className="bg-transparent border-b border-gray-500 text-lg md:text-xl text-white w-full focus:outline-none pb-2 placeholder-gray-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <X 
                  className="w-6 h-6 text-gray-400 cursor-pointer ml-2 hover:text-white" 
                  onClick={handleCloseSearch}
                />

                {/* Results Dropdown */}
                {results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-4 bg-[#181818] rounded-md shadow-2xl overflow-hidden border border-gray-700">
                    {results.map((movie) => (
                      <div
                        key={movie.id}
                        className="flex items-center gap-4 p-3 hover:bg-[#282828] cursor-pointer transition border-b border-gray-800 last:border-none"
                        onClick={() => handleResultClick(movie)}
                      >
                        <img
                          src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/92x138?text=No+Image'}
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="text-base font-medium text-white line-clamp-1">{movie.title || movie.name}</h4>
                          <p className="text-sm text-gray-400">
                            {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || 'N/A'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-5 text-white">
                <Search 
                  className="w-6 h-6 cursor-pointer hover:text-gray-300 transition" 
                  onClick={() => setIsSearchActive(true)}
                />
                <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300 transition" />
                <div className="flex items-center cursor-pointer gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="Profile"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
