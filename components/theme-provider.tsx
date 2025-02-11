"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface ThemeContext {
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

const ThemeContext = createContext<ThemeContext>({
  theme: "system",
  setTheme: () => {},
})

export const ThemeProvider: React.FC<{
  children: React.ReactNode
  attribute?: string
  defaultTheme?: "light" | "dark" | "system"
  enableSystem?: boolean
}> = ({ children, attribute = "class", defaultTheme = "system", enableSystem = true }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(defaultTheme)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

    if (enableSystem && theme === "system") {
      setTheme(prefersDark ? "dark" : "light")
    }

    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute(attribute, theme)
  }, [theme, enableSystem, attribute])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

