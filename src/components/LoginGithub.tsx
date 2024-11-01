"use client";

import { signIn } from 'next-auth/react';
import { FaGithub } from "react-icons/fa";

export const LoginGithub = () => {
  return (
    <button
      onClick={() => signIn('github', { callbackUrl: '/' })}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 text-white bg-gray-700 hover:bg-gray-800 border-2 border-gray-100 rounded-lg shadow-sm transition-all duration-200 transform"
    >
      <FaGithub className="text-xl" />
      <span className="font-medium">Entrar com Github</span>
    </button>
  );
};