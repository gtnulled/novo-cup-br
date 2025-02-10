import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("Gutim@2025", 10)

  const admin = await prisma.user.upsert({
    where: { username: "Administrador" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@example.com",
      username: "Administrador",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  console.log({ admin })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

