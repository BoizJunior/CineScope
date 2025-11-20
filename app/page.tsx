import MainView from '@/components/MainView';
import { 
  fetchTrendingMovies, 
  fetchTopRatedMovies, 
  fetchActionMovies, 
  fetchComedyMovies 
} from '@/lib/tmdb';

export default async function Home() {
  const trendingMovies = await fetchTrendingMovies();
  const topRatedMovies = await fetchTopRatedMovies();
  const actionMovies = await fetchActionMovies();
  const comedyMovies = await fetchComedyMovies();

  // Guard clause to prevent crash if critical data is missing
  if (!trendingMovies || trendingMovies.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#141414] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unable to load movies</h1>
          <p className="text-gray-400">Please check your internet connection or API key.</p>
        </div>
      </div>
    );
  }

  return (
    <MainView
      trendingMovies={trendingMovies}
      topRatedMovies={topRatedMovies}
      actionMovies={actionMovies}
      comedyMovies={comedyMovies}
    />
  );
}
