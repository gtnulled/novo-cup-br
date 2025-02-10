import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const presbyters = await prisma.presbyter.findMany()
  return NextResponse.json(presbyters)
}

export async function POST(request: Request) {
  const data = await request.json()
  const presbyter = await prisma.presbyter.create({ data })
  return NextResponse.json(presbyter)
}

