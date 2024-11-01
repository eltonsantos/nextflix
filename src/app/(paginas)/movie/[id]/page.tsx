import MovieDetail from "@/components/MovieDetail";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage(props: MoviePageProps) {
  const params = await props.params;
  const { id } = params;

  return (
    <div className="w-[90%] flex flex-col gap-16 md:w-3/4 lg:w-1/2 m-auto mt-14">
      <MovieDetail id={id} />
    </div>
  );
}