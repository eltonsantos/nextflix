import { LoginForm } from "@/components/LoginForm";
import { LoginGithub } from "@/components/LoginGithub";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full flex mt-20 justify-center">
      <div className="w-full max-w-[500px] p-8 space-y-6 border border-slate-300 rounded-md bg-white">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Para favoritar os filmes</h1>
          <p className="text-gray-500">Entre com suas credenciais</p>
        </div>

        <LoginForm />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              ou
            </span>
          </div>
        </div>

        <LoginGithub />

        <p className="text-center text-sm text-gray-500 mt-8">
          Não tem uma conta?{' '}
          <Link href="/api/auth/register" className="text-blue-500 hover:text-blue-600 font-medium">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}