import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: 'Preencha todos os campos' }), {
        status: 400,
      });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return new Response(
        JSON.stringify({ error: 'Usuário com este email já existe.' }),
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        loginMode: 'credentials',
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    return new Response(JSON.stringify({ error: 'Erro ao registrar o usuário.' }), {
      status: 500,
    });
  }
}