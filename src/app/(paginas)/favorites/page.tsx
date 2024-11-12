'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites/list');
        if (!response.ok) {
          throw new Error('Erro ao carregar favoritos');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (favorites.length === 0) {
    return <div>Nenhum filme favorito encontrado.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seus Favoritos</h2>
      <ul className="space-y-4">
        {favorites.map((favorite) => (
          <li key={favorite.id} className="flex items-start p-4 border bg-slate-200 border-gray-400 rounded-lg shadow-sm">
            <Image
              src={`https://image.tmdb.org/t/p/w200${favorite.poster_path}`}
              alt={favorite.title}
              width={100}
              height={150}
              className="rounded-lg object-cover mr-4"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-gray-900">
                {favorite.title}
              </h1>
              <p className="text-sm text-gray-700 mt-1">
                {favorite.overview}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Lançamento: {new Date(favorite.release_date).toLocaleDateString('pt-BR')}
              </p>
              <Link className="text-blue-500 mt-3 inline-block" href={`/movie/${favorite.id}`} passHref>Ver detalhes</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}