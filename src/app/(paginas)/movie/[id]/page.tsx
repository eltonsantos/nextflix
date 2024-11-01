import MovieDetail from "@/components/MovieDetail";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  return (
    <div className="w-[90%] flex flex-col gap-16 md:w-3/4 lg:w-1/2 m-auto mt-14">
      <MovieDetail id={id} />
    </div>
  );
}