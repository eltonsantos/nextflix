/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { BsStar, BsStarFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FavoriteButtonProps {
  movieId: number;
}

export function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const { data: session } = useSession()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (session) {
      checkIfFavorite()
    }
  }, [session, movieId])

  async function checkIfFavorite() {
    try {
      const response = await fetch(`/api/favorites/check/${movieId}`);
      if (!response.ok) {
        throw new Error('Erro ao verificar favorito');
      }
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error("Erro ao verificar status do favorito:", error);
    }
  }

  async function toggleFavorite() {
    if (!session) return;

    try {
      const response = await fetch('/api/favorites', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        if (isFavorite) {
          toast.success("Removido dos favoritos")
        } else {
          toast.success("Adicionado aos favoritos")
        }
      }
    } catch (error) {
      toast.error("Erro ao alterar favorito")
      console.error("Erro ao alterar favorito:", error);
    }
  }

  return(
    <>
      {session ? (
        <div onClick={toggleFavorite} className="flex mb-5 gap-4 hover:text-yellow-400 cursor-pointer">
          {isFavorite ? (
            <BsStarFill className="h-8 w-8" title="Remover dos favoritos" />
          ) : (
            <BsStar className="h-8 w-8" title="Adicionar aos favoritos" />
          )}
        </div>
      ) : (
        <div className="flex mb-5 gap-4">Entre para adicionar aos favoritos</div>
      )}
    </>
  )
}