import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import { getServerSession } from "next-auth";
import { ButtonLogout } from "./ButtonLogout";
import { User2 } from "lucide-react";

export default async function Navbar() {
  const session = await getServerSession()

  return (
    <nav className="flex justify-between p-4 bg-blue-700 dark:bg-blue-900 text-white">
      <Link href="/">
        <h1 className="text-xl font-bold">NEXT.flix</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeSwitch />
        <div className="flex gap-2 items-center justify-center">
          {session ? (
            <>
              {session.user?.image ? session.user?.image && (
                <div>
                  <Image
                    src={session.user?.image}
                    alt="Avatar"
                    width={35}
                    height={35}
                  />
                </div>
              ) : (
                <User2 />
              )}
              <div>Olá, {session?.user?.email}</div>
              <Link href="/favorites" className="hover:text-yellow-400">Favoritos</Link>
              <ButtonLogout />
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="hover:text-yellow-400">Entrar</Link>
              <Link href="/register" className="hover:text-yellow-400">Registrar</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}