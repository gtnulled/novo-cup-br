import { NextResponse } from "next/server"
import { generateUploadURL } from "@/lib/s3"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fileName = searchParams.get("fileName")
  const fileType = searchParams.get("fileType")

  if (!fileName || !fileType) {
    return NextResponse.json({ error: "Missing fileName or fileType" }, { status: 400 })
  }

  try {
    const uploadURL = await generateUploadURL(fileName, fileType)
    return NextResponse.json({ uploadURL })
  } catch (error) {
    console.error("Error generating upload URL:", error)
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 })
  }
}

