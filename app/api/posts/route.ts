import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Post from "@/lib/models/Post"
import { getServerSession } from "next-auth"

export async function GET(req: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") || "for-you"

    const skip = (page - 1) * limit

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("company", "name handle avatar")
      .lean()

    const total = await Post.countDocuments()

    return NextResponse.json({
      posts,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Posts fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect()
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, source } = await req.json()

    const post = await Post.create({
      company: session.user.id,
      title,
      content,
      source,
    })

    await post.populate("company", "name handle avatar")

    return NextResponse.json(post)
  } catch (error) {
    console.error("Post creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

