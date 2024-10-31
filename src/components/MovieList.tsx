"use client"

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MovieType } from "@/types/movie";
import axios from "axios";
// import Loading from "./Loading";

export default function MovieList() {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getMovies()
  }, [])

  async function getMovies() {
    try {
      await axios({
        url: "https://api.themoviedb.org/3/discover/movie",
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR'
        }
      }).then(response => {
        setMovies(response.data.results)
      })

      setIsLoading(false);

    } catch (error) {
      console.log("Erro ao buscar filmes", error)
    }
  }

  if (isLoading) {
    return "Carregando..."
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
}
