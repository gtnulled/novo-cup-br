import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const presbyter = await prisma.presbyter.update({
    where: { id: params.id },
    data: { isVerified: true },
  })
  return NextResponse.json(presbyter)
}

