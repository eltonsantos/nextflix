import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  isFavorite: boolean;
}

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500">Nenhum filme encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.posterPath}
        />
      ))}
    </div>
  );
}
