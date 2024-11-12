import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { movieId } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        movieId: parseInt(movieId)
      }
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar favorito' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { movieId } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    await prisma.favorite.deleteMany({
      where: {
        userId: user.id,
        movieId: parseInt(movieId)
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    return NextResponse.json(
      { error: 'Erro ao remover favorito' }, 
      { status: 500 }
    );
  }
}