"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheckIcon, UserPlusIcon, UsersIcon, ShieldIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { Select } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const [presbyters, setPresbyters] = useState([])
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    verified: 0,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { data: session } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    fetchPresbyters(currentPage)
    fetchStats()
    if (session?.user?.role === "SUPER_ADMIN") {
      fetchUsers()
    }
  }, [session, currentPage])

  const fetchPresbyters = async (page: number) => {
    try {
      const response = await fetch(`/api/presbyters?page=${page}`)
      const data = await response.json()
      setPresbyters(data.presbyters)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching presbyters:", error)
      toast({
        title: "Erro ao carregar presbíteros",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const fetchStats = async () => {
    const response = await fetch("/api/stats")
    const data = await response.json()
    setStats(data)
  }

  const fetchUsers = async () => {
    const response = await fetch("/api/users")
    const data = await response.json()
    setUsers(data)
  }

  const handleApprove = async (id: string) => {
    try {
      await fetch(`/api/presbyters/${id}/approve`, { method: "POST" })
      fetchPresbyters(currentPage)
      fetchStats()
      toast({
        title: "Presbítero aprovado",
        description: "O cadastro foi aprovado com sucesso.",
      })
    } catch (error) {
      console.error("Error approving presbyter:", error)
      toast({
        title: "Erro ao aprovar presbítero",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const handleVerify = async (id: string) => {
    try {
      await fetch(`/api/presbyters/${id}/verify`, { method: "POST" })
      fetchPresbyters(currentPage)
      fetchStats()
      toast({
        title: "Presbítero verificado",
        description: "O cadastro foi verificado com sucesso.",
      })
    } catch (error) {
      console.error("Error verifying presbyter:", error)
      toast({
        title: "Erro ao verificar presbítero",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/presbyters/${id}`, { method: "DELETE" })
      fetchPresbyters(currentPage)
      fetchStats()
      toast({
        title: "Presbítero excluído",
        description: "O cadastro foi excluído com sucesso.",
      })
    } catch (error) {
      console.error("Error deleting presbyter:", error)
      toast({
        title: "Erro ao excluir presbítero",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await fetch(`/api/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })
      fetchUsers()
      toast({
        title: "Função de usuário alterada",
        description: "A função do usuário foi alterada com sucesso.",
      })
    } catch (error) {
      console.error("Error changing user role:", error)
      toast({
        title: "Erro ao alterar função de usuário",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Presbíteros</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verificados</CardTitle>
            <ShieldIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verified}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Gerenciar Presbíteros</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Diocese</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {presbyters.map((presbyter: any) => (
            <TableRow key={presbyter.id}>
              <TableCell>{presbyter.name}</TableCell>
              <TableCell>{presbyter.type}</TableCell>
              <TableCell>{presbyter.diocese}</TableCell>
              <TableCell>{presbyter.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleApprove(presbyter.id)} className="mr-2">
                  Aprovar
                </Button>
                <Button onClick={() => handleVerify(presbyter.id)} className="mr-2">
                  Verificar
                </Button>
                <Button onClick={() => handleDelete(presbyter.id)} variant="destructive">
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {session?.user?.role === "SUPER_ADMIN" && (
        <>
          <h2 className="text-2xl font-bold my-8">Gerenciar Usuários</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Select value={user.role} onValueChange={(newRole) => handleRoleChange(user.id, newRole)}>
                      <option value="USER">Usuário</option>
                      <option value="MODERATOR">Moderador</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  )
}

