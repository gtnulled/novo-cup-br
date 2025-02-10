import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getPresbyterById(id: string) {
  return await prisma.presbyter.findUnique({ where: { id } })
}

