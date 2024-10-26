import MovieList from "@/components/MovieList";
import { getMovies } from "@/utils/movies";

export default async function Home() {

  const movies = await getMovies();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Filmes Populares</h1>
      <MovieList movies={movies} />
    </div>
  );
}