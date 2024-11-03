import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { getServerSession } from "next-auth";
import { ButtonLogout } from "./ButtonLogout";

export default async function Navbar() {
  const session = await getServerSession()

  return (
    <nav className="flex justify-between p-4 bg-blue-700 dark:bg-blue-900 text-white">
      <Link href="/">
        <h1 className="text-xl font-bold">NEXT.flix</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeSwitch />
        <div>
          {session ? (
            <>
              <div>Olá, {session?.user?.name}</div>
              <ButtonLogout />
              <Link href="/favorites">Favoritos</Link>
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">Entrar</Link>
              <Link href="/register">Registrar</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}