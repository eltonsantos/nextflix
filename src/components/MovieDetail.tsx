/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface MovieDetailProps {
  id: string | string[];
}

interface MovieData {
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export default function MovieDetail({ id }: MovieDetailProps) {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
              api_key: process.env.NEXT_PUBLIC_API_KEY,
              language: "pt-BR",
            },
          })
          
          setMovie(response.data);
        } catch (error) {
        setError(error instanceof Error ? error.message : "Erro ao carregar o filme");
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [id]);


  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
        <p className="text-red-500">{error || "Filme não encontrado"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            width={400}
            height={600}
            className="rounded-lg object-cover shadow-md"
          />
        </div>

        <div className="flex flex-col gap-4 md:w-2/3">
          <h1 className="text-4xl font-bold text-blue-400">{movie.title}</h1>
          <p className="text-sm text-gray-400">Lançado em: {movie.release_date}</p>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 font-semibold text-lg">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">/ 10</span>
          </div>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}