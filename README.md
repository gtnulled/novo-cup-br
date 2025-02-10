# Cadastro Nacional de Presbíteros do Brasil

Este portal é um sistema de cadastro e busca de presbíteros no Brasil, incluindo padres, bispos e diáconos.

## Funcionalidades

- Página inicial com busca interativa de presbíteros
- Cadastro de novos presbíteros
- Perfis individuais para cada presbítero
- Painel administrativo para gerenciar cadastros
- Sistema de autenticação com níveis de acesso (usuário, moderador, admin, super admin)

## Tecnologias Utilizadas

- Next.js 13 (App Router)
- React
- TypeScript
- Prisma (ORM)
- PostgreSQL
- Tailwind CSS
- NextAuth.js

## Instalação e Configuração

1. Clone o repositório:
   \`\`\`
   git clone https://github.com/seu-usuario/cadastro-presbiteros-brasil.git
   cd cadastro-presbiteros-brasil
   \`\`\`

2. Instale as dependências:
   \`\`\`
   npm install
   \`\`\`

3. Configure as variáveis de ambiente:
   Crie um arquivo \`.env.local\` na raiz do projeto e adicione as seguintes variáveis:
   \`\`\`
   DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_banco"
   NEXTAUTH_SECRET="sua_chave_secreta"
   NEXTAUTH_URL="http://localhost:3000"
   \`\`\`

4. Execute as migrações do banco de dados:
   \`\`\`
   npx prisma migrate dev
   \`\`\`

5. Inicie o servidor de desenvolvimento:
   \`\`\`
   npm run dev
   \`\`\`

## Implantação no Vercel

1. Crie uma conta no [Vercel](https://vercel.com) se ainda não tiver uma.

2. Instale a CLI do Vercel:
   \`\`\`
   npm i -g vercel
   \`\`\`

3. Faça login na sua conta Vercel:
   \`\`\`
   vercel login
   \`\`\`

4. Na raiz do projeto, execute:
   \`\`\`
   vercel
   \`\`\`

5. Siga as instruções para configurar seu projeto. Certifique-se de adicionar as variáveis de ambiente necessárias nas configurações do projeto no dashboard do Vercel.

6. Para futuras implantações, você pode usar:
   \`\`\`
   vercel --prod
   \`\`\`

## Estrutura do Banco de Dados

O esquema do banco de dados inclui as seguintes tabelas principais:

- \`Presbyter\`: Armazena informações sobre os presbíteros
- \`User\`: Armazena informações dos usuários do sistema

Para mais detalhes, consulte o arquivo \`prisma/schema.prisma\`.

## Níveis de Acesso

- Usuário: Pode buscar e visualizar perfis de presbíteros
- Moderador: Pode aprovar novos cadastros e editar informações
- Admin: Tem acesso completo ao painel administrativo
- Super Admin: Pode gerenciar outros usuários e suas permissões

## Contribuição

Contribuições são bem-vindas! Por favor, leia o arquivo CONTRIBUTING.md para detalhes sobre nosso código de conduta e o processo para enviar pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE.md para detalhes.

