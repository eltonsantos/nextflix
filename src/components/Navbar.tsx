import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-blue-700 dark:bg-blue-900 text-white">
      <Link href="/">
        <h1 className="text-xl font-bold">NEXT.flix</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeSwitch />
        <Link href="/favorites">Favoritos</Link>
        <Link href="/api/auth/login">Entrar</Link>
      </div>
    </nav>
  );
}