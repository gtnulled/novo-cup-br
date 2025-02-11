"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, Loader2 } from "lucide-react"
import { useDebounce } from "@/lib/hooks"
import type React from "react" // Added import for React

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false) // Added isLoading state
  const router = useRouter()
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoading(true) // Set isLoading to true before fetching
      fetch(`/api/search?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data)
          setIsLoading(false) // Set isLoading to false after fetching
        })
        .catch((error) => {
          console.error("Error fetching search results:", error)
          setIsLoading(false) // Set isLoading to false on error
        })
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.length > 2) {
      router.push(`/search?q=${query}`)
    }
  }

  return (
    <div className="w-full max-w-xl relative">
      <form onSubmit={handleSearch} className="flex items-center">
        <Input
          type="search"
          placeholder="Buscar presbítero..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pr-10"
        />
        <Button type="submit" className="absolute right-0 top-0 bottom-0">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SearchIcon className="w-4 h-4" />}
        </Button>
      </form>
      {results.length > 0 && (
        <ul className="mt-2 bg-background border rounded-md shadow-md absolute w-full z-10">
          {results.map((result: any) => (
            <li
              key={result.id}
              className="p-2 hover:bg-accent cursor-pointer"
              onClick={() => router.push(`/presbyter/${result.id}`)}
            >
              {result.name} - {result.diocese}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

