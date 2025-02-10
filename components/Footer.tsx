import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Cadastro Nacional de Presbíteros do Brasil</p>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/sobre" className="hover:underline">
              Sobre
            </Link>
            <Link href="/contato" className="hover:underline">
              Contato
            </Link>
            <Link href="/termos-e-privacidade" className="hover:underline">
              Termos e Privacidade
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

