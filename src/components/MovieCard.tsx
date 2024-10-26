import Image from "next/image";

interface MovieCardProps {
  id: number;  
  title: string;
  posterPath: string;
}

export default function MovieCard({ title, posterPath }: MovieCardProps) {
  return (
    <div className="card">
      <Image 
        src={posterPath}
        alt={title}
        width={300}
        height={450}
        className="rounded-lg"
      />
      <h2 className="mt-2 text-lg font-semibold">{title}</h2>
    </div>
  );
}