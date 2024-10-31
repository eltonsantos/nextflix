import { MovieType } from "@/types/movie";
import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";

interface MovieCardProps {
  movie: MovieType;
}

export default function MovieCard(props: MovieCardProps) {
  const movie = props.movie;

  return (
    <li className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all transform hover:scale-105 list-none">
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          width={250}
          height={300}
          className="w-full h-auto object-cover transition-opacity duration-300 hover:opacity-50"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h3 className="text-white text-lg font-semibold mb-1">{movie.title}</h3>
        <StarRating rating={movie.vote_average} />
        
        {movie.overview && (
          <p className="text-gray-300 text-sm mt-2 line-clamp-3">
            {movie.overview.length > 100
              ? `${movie.overview.substring(0, 100)}...`
              : movie.overview}
          </p>
        )}
        
        <Link href={`/movie/${movie.id}`} passHref>
          <button className="mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-indigo-700 transition-colors duration-300">
            Ver mais
          </button>
        </Link>
        
      </div>
    </li>
  );
}
