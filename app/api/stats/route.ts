import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const total = await prisma.presbyter.count()
  const approved = await prisma.presbyter.count({ where: { status: "APPROVED" } })
  const pending = await prisma.presbyter.count({ where: { status: "PENDING" } })
  const verified = await prisma.presbyter.count({ where: { isVerified: true } })

  return NextResponse.json({ total, approved, pending, verified })
}

