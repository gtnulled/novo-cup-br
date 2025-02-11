import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cadastro Nacional de Presbíteros do Brasil",
  description: "Portal para registro e busca de presbíteros no Brasil",
  keywords: "presbíteros, padres, bispos, diáconos, igreja, Brasil, cadastro",
  authors: [{ name: "Sua Organização" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seu-dominio.com.br",
    title: "Cadastro Nacional de Presbíteros do Brasil",
    description: "Portal para registro e busca de presbíteros no Brasil",
    siteName: "CNPB",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'