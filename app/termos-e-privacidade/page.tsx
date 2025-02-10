import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsAndPrivacyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Termos de Uso e Política de Privacidade</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Termos de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>O usuário concorda em fornecer informações verdadeiras e atualizadas.</li>
            <li>O uso indevido ou não autorizado do sistema é proibido.</li>
            <li>
              O Cadastro Nacional de Presbíteros do Brasil reserva-se o direito de modificar ou encerrar o serviço a
              qualquer momento.
            </li>
            <li>O usuário é responsável por manter a confidencialidade de sua conta e senha.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Política de Privacidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Coletamos apenas os dados necessários para o funcionamento do cadastro.</li>
            <li>Seus dados pessoais são tratados de acordo com a Lei Geral de Proteção de Dados (LGPD).</li>
            <li>Você tem o direito de acessar, corrigir e solicitar a exclusão de seus dados.</li>
            <li>Não compartilhamos suas informações com terceiros sem seu consentimento expresso.</li>
            <li>Utilizamos medidas de segurança adequadas para proteger seus dados.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

