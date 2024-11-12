"use client";

import { signIn } from 'next-auth/react';
import { FiMail, FiLock } from 'react-icons/fi';
import { toast } from "react-toastify";

export const LoginForm = () => {
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    const response = await signIn("credentials", {
      ...data,
      redirect: false
    })

    if (response?.ok) {
      window.location.href = "/"
      toast.success("Logado com sucesso");
    } else {
      toast.error('Email ou senha inválidos.');
      console.error("Email ou senha inválidos.");
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-blue-500" />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Digite seu email"
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-100 hover:border-blue-100 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors bg-gray-50 text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-blue-500" />
          </div>
          <input
            name="password"
            type="password"
            placeholder="Digite sua senha"
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-100 hover:border-blue-100 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors bg-gray-50 text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Lembrar-me
            </label>
          </div>
          <a href="#" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
            Esqueceu a senha?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};