"use client"
import { Sidebar } from "@/components/sidebar"
import { BottomNav } from "@/components/bottom-nav"
import { TrendBar } from "@/components/trend-bar"
import { SearchBar } from "@/components/search-bar"
import { MobileHeader } from "@/components/mobile-header"
import { MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageTabs } from "@/components/page-tabs"
import Link from "next/link"

interface Notification {
  id: number
  company: {
    name: string
    handle: string
    avatar: string
  }
  postId: string
  title: string
  time: string
}

const notifications: Notification[] = [
  {
    id: 1,
    company: { name: "Tesla", handle: "tesla", avatar: "/placeholder.svg?height=40&width=40" },
    postId: "tesla-new-battery",
    title: "New Battery Technology Announcement",
    time: "2h ago",
  },
  {
    id: 2,
    company: { name: "Apple", handle: "apple", avatar: "/placeholder.svg?height=40&width=40" },
    postId: "apple-m2-chip",
    title: "M2 Chip Outperforms Competitors",
    time: "4h ago",
  },
  {
    id: 3,
    company: { name: "Amazon", handle: "amazon", avatar: "/placeholder.svg?height=40&width=40" },
    postId: "amazon-same-day-delivery",
    title: "Same-Day Delivery Expansion",
    time: "1d ago",
  },
]

export default function NotificationsPage() {
  const tabs = [
    {
      value: "all",
      label: "All",
      content: (
        <div>
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      ),
    },
    {
      value: "mentions",
      label: "Mentions",
      content: <p className="text-center text-gray-500 py-4">No mentions yet.</p>,
    },
    {
      value: "verified",
      label: "Verified",
      content: <p className="text-center text-gray-500 py-4">No verified notifications yet.</p>,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 w-full md:ml-64">
          <MobileHeader />
          <div className="max-w-5xl mx-auto py-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-2xl font-bold mb-4">Notifications</h1>
                <PageTabs tabs={tabs} />
              </div>
              <div className="hidden md:flex md:flex-col">
                <SearchBar />
                <div className="mt-4">
                  <TrendBar />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div className="border-b p-4 hover:bg-gray-50">
      <div className="flex space-x-3">
        <Link href={`/profile/${notification.company.handle}`}>
          <Avatar>
            <AvatarImage src={notification.company.avatar} alt={notification.company.name} />
            <AvatarFallback>{notification.company.name[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <Link href={`/profile/${notification.company.handle}`} className="font-bold hover:underline">
              {notification.company.name}
            </Link>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{notification.time}</span>
          </div>
          <Link href={`/post/${notification.postId}`} className="block mt-1 group">
            <p className="group-hover:underline">
              <MessageSquare className="inline-block h-4 w-4 text-blue-500 mr-2" />
              <span>New post: {notification.title}</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

