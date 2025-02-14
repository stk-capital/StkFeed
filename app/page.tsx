"use client"

import { Sidebar } from "@/components/sidebar"
import { BottomNav } from "@/components/bottom-nav"
import { TrendBar } from "@/components/trend-bar"
import { SearchBar } from "@/components/search-bar"
import { PostList } from "@/components/post-list"
import { MobileHeader } from "@/components/mobile-header"
import { PageTabs } from "@/components/page-tabs"

export default function Home() {
  const tabs = [
    {
      value: "following",
      label: "Following",
      content: <PostList type="following" />,
    },
    {
      value: "for-you",
      label: "For You",
      content: <PostList type="for-you" />,
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

