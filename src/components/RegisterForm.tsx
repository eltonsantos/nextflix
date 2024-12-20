"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { toast } from "react-toastify";

export const RegisterForm = () => {
  const router = useRouter();
  const [, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Cadastrado com sucesso, faça login para entrar no sistema.");
        router.push("/login");
      } else {
        toast.success("Erro ao registrar o usuário: ", data.error);
        setError(data.error || "Erro ao registrar o usuário.");
      }

    } catch (error) {
      console.error("Erro ao registrar o usuário:", error);
      setError("Erro ao registrar o usuário.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiUser className="h-5 w-5 text-blue-500" />
          </div>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-100 hover:border-blue-100 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors bg-gray-50 text-gray-700 placeholder-gray-400"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-blue-500" />
          </div>
          <input
            type="email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-100 hover:border-blue-100 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors bg-gray-50 text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-blue-500" />
          </div>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-100 hover:border-blue-100 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors bg-gray-50 text-gray-700 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};