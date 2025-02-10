import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const presbyter = await prisma.presbyter.findUnique({ where: { id: params.id } })
  if (!presbyter) {
    return NextResponse.json({ error: "Presbyter not found" }, { status: 404 })
  }
  return NextResponse.json(presbyter)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  const presbyter = await prisma.presbyter.update({
    where: { id: params.id },
    data,
  })
  return NextResponse.json(presbyter)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.presbyter.delete({ where: { id: params.id } })
  return NextResponse.json({ message: "Presbyter deleted successfully" })
}

