import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { name, email, password } = body;

    // Aqui você deve adicionar validações

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Aqui você deve salvar no seu banco de dados
    // Por enquanto, vamos salvar no localStorage (apenas exemplo)
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword
      });
      localStorage.setItem("users", JSON.stringify(users));
    }

    return NextResponse.json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao registrar usuário: ", error },
      { status: 500 }
    );
  }
}