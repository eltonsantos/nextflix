import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { favorites: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const favoriteMovies = await Promise.all(
      user.favorites.map(async (favorite) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${favorite.movieId}`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            language: 'pt-BR',
          },
        });
        return response.data;
      })
    );

    return NextResponse.json(favoriteMovies);
  } catch (error) {
    console.error('Erro ao obter favoritos:', error);
    return NextResponse.json(
      { error: 'Erro ao obter favoritos' },
      { status: 500 }
    );
  }
}