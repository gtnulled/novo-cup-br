import SearchBar from "@/components/SearchBar"
import { Button } from "@/components/ui/button"
import { ChurchIcon, UserPlusIcon } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-secondary to-background">
      <div className="max-w-5xl w-full text-center">
        <h1 className="mb-8 text-4xl font-bold text-primary">Cadastro Nacional de Presbíteros do Brasil</h1>
        <div className="mb-12">
          <SearchBar />
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/cadastro">
            <Button className="flex items-center space-x-2">
              <UserPlusIcon className="w-4 h-4" />
              <span>Cadastrar Presbítero</span>
            </Button>
          </Link>
          <Link href="/sobre">
            <Button variant="outline" className="flex items-center space-x-2">
              <ChurchIcon className="w-4 h-4" />
              <span>Sobre o Portal</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

