"use client"

import { useTheme } from "@/components/theme-provider"
import { SunIcon, MoonIcon } from "lucide-react"

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md hover:bg-accent/10 transition-colors dark:hover:bg-accent/20"
    >
      {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
    </button>
  )
}

