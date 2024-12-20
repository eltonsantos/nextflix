import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

type FavoriteProps = {
  params: Promise<{
    movieId: string
  }>
}

export async function GET(request: NextRequest, props: FavoriteProps) {
  const params = await props.params;
  const movieId = parseInt(params.movieId);

  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ isFavorite: false });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ isFavorite: false });
    }

    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        movieId
      }
    });

    return NextResponse.json({ isFavorite: !!favorite });
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    return NextResponse.json({ isFavorite: false });
  }
}