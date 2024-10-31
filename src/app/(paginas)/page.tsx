import MovieList from "@/components/MovieList";

export default async function Home() {

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Filmes Populares</h1>
      <MovieList />
    </div>
  );
}