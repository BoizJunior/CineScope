import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const fetcher = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
}

export const fetchTrendingMovies = async () => {
  try {
    const res = await fetcher.get('/trending/all/week');
    return res.data.results as Movie[] || [];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const res = await fetcher.get('/movie/top_rated');
    return res.data.results as Movie[] || [];
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};

export const fetchActionMovies = async () => {
  try {
    const res = await fetcher.get('/discover/movie?with_genres=28');
    return res.data.results as Movie[] || [];
  } catch (error) {
    console.error("Error fetching action movies:", error);
    return [];
  }
};

export const fetchComedyMovies = async () => {
  try {
    const res = await fetcher.get('/discover/movie?with_genres=35');
    return res.data.results as Movie[] || [];
  } catch (error) {
    console.error("Error fetching comedy movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (id: string | number) => {
  if (!id) return null;
  try {
    const res = await fetcher.get(`/movie/${id}`, {
      params: { append_to_response: 'videos' }
    });
    return res.data as MovieDetails;
  } catch (error) {
    console.error(`Error fetching movie details for id ${id}:`, error);
    return null;
  }
};

export const searchMovies = async (query: string) => {
  if (!query) return [];
  try {
    const res = await fetcher.get('/search/movie', {
      params: { query: query }
    });
    return res.data.results as Movie[] || [];
  } catch (error) {
    console.error(`Error searching movies for query "${query}":`, error);
    return [];
  }
};

export const fetchMovieVideos = async (id: number) => {
  if (!id) return [];
  try {
    const res = await fetcher.get(`/movie/${id}/videos`);
    return res.data.results as {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[] || [];
  } catch (error) {
    console.error(`Error fetching videos for id ${id}:`, error);
    return [];
  }
};
