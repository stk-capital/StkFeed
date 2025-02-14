import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Notification from "@/lib/models/Notification"
import { getServerSession } from "next-auth"

export async function GET(req: Request) {
  try {
    await dbConnect()
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const type = searchParams.get("type")

    const skip = (page - 1) * limit
    const query = {
      recipient: session.user.id,
      ...(type && { type }),
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name handle avatar")
      .populate("post", "title")
      .lean()

    const total = await Notification.countDocuments(query)

    return NextResponse.json({
      notifications,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Notifications fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect()
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { ids } = await req.json()

    await Notification.updateMany(
      {
        _id: { $in: ids },
        recipient: session.user.id,
      },
      { read: true },
    )

    return NextResponse.json({ message: "Notifications marked as read" })
  } catch (error) {
    console.error("Notifications update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

