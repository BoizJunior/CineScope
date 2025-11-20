'use client';

import { useState, useEffect } from 'react';
import { Movie, fetchMovieVideos } from '@/lib/tmdb';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import Navbar from '@/components/Navbar';
import IntroLoader from '@/components/IntroLoader';
import Modal from '@/components/Modal';

interface MainViewProps {
  trendingMovies: Movie[];
  topRatedMovies: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
}

export default function MainView({
  trendingMovies,
  topRatedMovies,
  actionMovies,
  comedyMovies,
}: MainViewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleMovieClick = async (movie: Movie) => {
    const videos = await fetchMovieVideos(movie.id);
    const trailer = videos.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    );
    
    if (trailer) {
      setTrailerKey(trailer.key);
      setShowModal(true);
    } else {
      // Fallback to first video if no trailer found, or just alert
      if (videos.length > 0) {
        setTrailerKey(videos[0].key);
        setShowModal(true);
      } else {
        console.log('No trailer found for this movie');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTrailerKey(null);
  };

  if (isLoading) {
    return <IntroLoader />;
  }

  return (
    <div className="relative h-screen bg-[#141414] lg:h-[140vh]">
      <Navbar onSearchSelect={handleMovieClick} />
      
      <main className="relative pb-24 lg:space-y-24">
        <Hero movies={trendingMovies} onPlayClick={handleMovieClick} />
        
        <section className="pl-4 lg:pl-16 md:space-y-24 mt-10 md:mt-16">
          <MovieRow title="Trending Now" movies={trendingMovies} isLargeRow onMovieClick={handleMovieClick} />
          <MovieRow title="Top Rated" movies={topRatedMovies} onMovieClick={handleMovieClick} />
          <MovieRow title="Action Thrillers" movies={actionMovies} onMovieClick={handleMovieClick} />
          <MovieRow title="Comedies" movies={comedyMovies} onMovieClick={handleMovieClick} />
        </section>
      </main>

      {showModal && trailerKey && (
        <Modal trailerKey={trailerKey} onClose={handleCloseModal} />
      )}
    </div>
  );
}
