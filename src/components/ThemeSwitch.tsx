"use client"

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), [])

  if (mounted) return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-2xl hover:text-yellow-400">
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}