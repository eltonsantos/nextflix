"use client"

import { signOut } from "next-auth/react"

export function ButtonLogout() {
  return (
    <button className="hover:text-yellow-400" onClick={() => signOut()}>Sair</button>
  )
}