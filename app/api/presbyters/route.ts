import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const limit = 10 // Number of items per page

  const skip = (page - 1) * limit

  const [presbyters, total] = await Promise.all([
    prisma.presbyter.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.presbyter.count(),
  ])

  const totalPages = Math.ceil(total / limit)

  return NextResponse.json({
    presbyters,
    totalPages,
    currentPage: page,
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  const presbyter = await prisma.presbyter.create({ data })
  return NextResponse.json(presbyter)
}

