import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Post from "@/lib/models/Post"
import { getServerSession } from "next-auth"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const post = await Post.findById(params.id).populate("company", "name handle avatar").lean()

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Post fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const post = await Post.findById(params.id)
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (post.company.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await req.json()
    const updatedPost = await Post.findByIdAndUpdate(params.id, { title, content }, { new: true }).populate(
      "company",
      "name handle avatar",
    )

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Post update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const post = await Post.findById(params.id)
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (post.company.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await Post.findByIdAndDelete(params.id)
    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Post deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

