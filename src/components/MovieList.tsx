"use client"

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MovieType } from "@/types/movie";
import axios from "axios";

export default function MovieList() {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            language: 'pt-BR'
          }
        });
        
        setMovies(response.data.results)
      } catch (error) {
        console.log("Erro ao buscar filmes", error)
      } finally {
        setIsLoading(false);
      }
    }

    getMovies()
  }, [])


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
