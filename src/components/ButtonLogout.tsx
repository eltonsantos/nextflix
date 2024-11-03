"use client"

import { signOut } from "next-auth/react"

export function ButtonLogout() {
  return (
    <button onClick={() => signOut()}>Sair</button>
  )
}