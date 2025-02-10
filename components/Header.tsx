import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserPlus, LogIn } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          CNPB
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/cadastro">
            <Button variant="secondary">
              <UserPlus className="mr-2 h-4 w-4" />
              Cadastrar
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

