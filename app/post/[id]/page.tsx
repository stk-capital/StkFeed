import { Sidebar } from "@/components/sidebar"
import { BottomNav } from "@/components/bottom-nav"
import { TrendBar } from "@/components/trend-bar"
import { SearchBar } from "@/components/search-bar"
import { MobileHeader } from "@/components/mobile-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Star } from "lucide-react"
import Link from "next/link"

// This would come from your API in a real app
const posts = {
  "tesla-new-battery": {
    company: "Tesla",
    handle: "tesla",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "New Battery Technology Announcement",
    content:
      "Tesla announces new battery technology that could significantly increase range. The new cells, which Tesla is calling 4680 cells, will enable electric cars to have a much longer range and be more affordable. This breakthrough is expected to revolutionize the electric vehicle industry and accelerate the transition to sustainable energy.",
    timestamp: "2h ago",
    likes: 1500,
    dislikes: 50,
    shares: 750,
  },
  "apple-m2-chip": {
    company: "Apple",
    handle: "apple",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "M2 Chip Outperforms Competitors",
    content:
      "Apple's new M2 chip outperforms competitors in benchmark tests. The latest iteration of Apple's custom silicon shows significant improvements in both CPU and GPU performance, solidifying Apple's position as a leader in chip design. This development is expected to have far-reaching implications for the personal computing industry.",
    timestamp: "4h ago",
    likes: 2000,
    dislikes: 100,
    shares: 1000,
  },
  "amazon-same-day-delivery": {
    company: "Amazon",
    handle: "amazon",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Same-Day Delivery Expansion",
    content:
      "Amazon expands same-day delivery service to more cities. This move is part of Amazon's strategy to improve its logistics network and provide faster delivery options to customers. The expansion is expected to put pressure on traditional retailers and further cement Amazon's dominance in the e-commerce sector.",
    timestamp: "1d ago",
    likes: 1200,
    dislikes: 80,
    shares: 600,
  },
}

export default function PostPage({ params }: { params: { id: string } }) {
  const post = posts[params.id as keyof typeof posts]

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 w-full md:ml-64">
          <MobileHeader />
          <div className="max-w-5xl mx-auto py-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <Link href={`/profile/${post.handle}`}>
                        <Avatar>
                          <AvatarImage src={post.avatar} alt={post.company} />
                          <AvatarFallback>{post.company[0]}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div>
                        <Link href={`/profile/${post.handle}`} className="font-bold hover:underline">
                          {post.company}
                        </Link>
                        <p className="text-sm text-gray-500">@{post.handle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <p className="text-sm text-gray-500 mb-4">{post.timestamp}</p>
                    <div className="flex justify-between items-center border-t border-b py-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                        <ThumbsUp className="w-5 h-5 mr-2" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                        <ThumbsDown className="w-5 h-5 mr-2" />
                        <span>{post.dislikes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                        <Share2 className="w-5 h-5 mr-2" />
                        <span>{post.shares}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-yellow-500">
                        <Star className="w-5 h-5 mr-2" />
                        <span>Follow</span>
                      </Button>
                    </div>
                  </div>
                </div>
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

