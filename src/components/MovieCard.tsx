import { MovieType } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  movie: MovieType
}

export default function MovieCard(props: MovieCardProps) {

  const movie = props.movie;

  return (
    <Link
      href={`/movie/${movie.id}`}
    >
      <div className="card">
        <Image 
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg"
        />
        <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
      </div>
    </Link>
  );
}