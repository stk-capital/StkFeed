import { Sidebar } from "@/components/sidebar"
import { BottomNav } from "@/components/bottom-nav"
import { Post } from "@/components/post"
import { Button } from "@/components/ui/button"
import { Globe, Users } from "lucide-react"
import Image from "next/image"
import { SearchBar } from "@/components/search-bar"
import { TrendBar } from "@/components/trend-bar"
import { MobileHeader } from "@/components/mobile-header"

const companyProfile = {
  name: "Tesla",
  handle: "tesla",
  avatar: "/placeholder.svg?height=400&width=400",
  coverImage: "/placeholder.svg?height=400&width=1200",
  description: "Electric vehicles, energy storage & solar",
  website: "https://www.tesla.com",
  followers: "22.8M",
}

const posts = [
  {
    company: "Tesla",
    handle: "tesla",
    source: "The Information",
    title: "New Battery Technology Announcement",
    content:
      "Tesla announces new battery technology that could significantly increase range. The new cells, which Tesla is calling 4680 cells, will enable electric cars to have a much longer range and be more affordable. This breakthrough is expected to revolutionize the electric vehicle industry and accelerate the transition to sustainable energy.",
    timestamp: "2h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    company: "Tesla",
    handle: "tesla",
    source: "Bloomberg",
    title: "Q2 Earnings Report",
    content:
      "Tesla's Q2 earnings report shows record deliveries despite supply chain challenges. The company has managed to navigate global supply chain disruptions and semiconductor shortages to achieve impressive growth in both production and deliveries. This performance has exceeded analyst expectations and reinforced Tesla's position as the leading electric vehicle manufacturer.",
    timestamp: "5h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    company: "Tesla",
    handle: "tesla",
    source: "Reuters",
    title: "New Gigafactory in Berlin",
    content:
      "New Gigafactory in Berlin begins production, boosting Tesla's European presence. This state-of-the-art facility is set to become Tesla's manufacturing hub for Europe, producing both vehicles and battery cells. The opening of this factory marks a significant milestone in Tesla's global expansion strategy and is expected to accelerate the adoption of electric vehicles in Europe.",
    timestamp: "1d",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function CompanyProfilePage({ params }: { params: { handle: string } }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 w-full md:ml-64">
          <MobileHeader />
          <div className="max-w-5xl mx-auto py-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="relative h-32 md:h-48 bg-gray-300 rounded-t-lg overflow-hidden mb-4">
                  <Image
                    src={companyProfile.coverImage || "/placeholder.svg"}
                    alt="Cover image"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4">
                    <div className="flex justify-between items-start mt-[-48px]">
                      <Image
                        src={companyProfile.avatar || "/placeholder.svg"}
                        alt={companyProfile.name}
                        width={96}
                        height={96}
                        className="rounded-full border-4 border-white"
                      />
                      <Button className="mt-12">Follow</Button>
                    </div>
                    <div className="mt-2">
                      <h1 className="text-2xl font-bold">{companyProfile.name}</h1>
                      <p className="text-gray-500">@{companyProfile.handle}</p>
                    </div>
                    <p className="mt-4">{companyProfile.description}</p>
                    <div className="flex space-x-4 mt-4 text-gray-500">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        <a
                          href={companyProfile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          {companyProfile.website.replace("https://", "")}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {companyProfile.followers} followers
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
                  {posts.map((post, index) => (
                    <Post key={index} {...post} />
                  ))}
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

