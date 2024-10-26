const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
}

export async function getMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
    );
    const data = await response.json();

    return data.results.slice(0, 20).map((movie: MovieData) => ({
      id: movie.id,
      title: movie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      isFavorite: false,
    }));
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    return [];
  }
}

export async function getMovieDetails() {
}

export async function toggleFavorite() {
}