"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { BottomNav } from "@/components/bottom-nav"
import { Post } from "@/components/post"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, Share2, TrendingUp, Clock, AlertCircle } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { TrendBar } from "@/components/trend-bar"
import { MobileHeader } from "@/components/mobile-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would come from your API in a real app
const trendingTopics = {
  "openai-roadmap": {
    title: "OpenAI's AI Evolution: GPT-4.5 and GPT-5 Roadmap Unveiled",
    summary:
      "OpenAI, under CEO Sam Altman, has outlined its future plans for AI model development, announcing the imminent release of GPT-4.5, known internally as Orion, as the last model without chain-of-thought reasoning capabilities. Following closely, GPT-5 is expected to launch within months, aiming to integrate all of OpenAI's technologies into a single, versatile system.",
    lastUpdated: "2 hours ago",
    disclaimer: "This story is a summary of posts and may evolve over time.",
    category: "Technology",
    postCount: 17000,
  },
}

const posts = [
  {
    company: "OpenAI",
    handle: "openai",
    source: "TechCrunch",
    title: "OpenAI Announces GPT-4.5 and GPT-5 Roadmap",
    content:
      "OpenAI announces GPT-4.5 and GPT-5 roadmap, showcasing ambitious plans for the future of AI. The company aims to push the boundaries of natural language processing and artificial general intelligence with these upcoming models. This announcement has sent waves through the tech industry, with experts speculating on the potential implications for various sectors.",
    timestamp: "1h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    company: "AI Research Institute",
    handle: "airesearch",
    title: "Breaking Down the Key Features of GPT-4.5",
    content:
      "An in-depth analysis of the key features of GPT-4.5, as announced by OpenAI. This model is expected to bridge the gap between current language models and more advanced cognitive capabilities. Experts are particularly excited about the potential for improved context understanding and more coherent long-form content generation.",
    source: "AI Journal",
    timestamp: "3h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    company: "Tech News Network",
    handle: "technews",
    title: "Community Reacts to OpenAI's Announcement",
    content:
      "Live updates: The AI community reacts to OpenAI's announcement of GPT-4.5 and GPT-5. Researchers, developers, and industry leaders share their thoughts on the potential impact of these new models. While many are excited about the possibilities, some express concerns about the ethical implications and the need for responsible AI development.",
    source: "Tech News Network",
    timestamp: "5h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function TrendingTopicPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("top")
  const topic = trendingTopics[params.id as keyof typeof trendingTopics]

  if (!topic) {
    return <div>Topic not found</div>
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
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold mb-2">{topic.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          <Clock className="inline-block w-4 h-4 mr-1" />
                          Last updated {topic.lastUpdated}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <BookmarkIcon className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <Badge variant="secondary" className="mr-2">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {topic.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {(topic.postCount / 1000).toFixed(1)}K posts
                      </span>
                    </div>
                    <p className="text-base/relaxed mb-4">{topic.summary}</p>
                    <div className="text-sm text-muted-foreground italic flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {topic.disclaimer}
                    </div>
                  </CardContent>
                </Card>
                <Tabs defaultValue="top" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="top">Top</TabsTrigger>
                    <TabsTrigger value="latest">Latest</TabsTrigger>
                  </TabsList>
                  <TabsContent value="top">
                    {posts
                      .filter((post) => post.timestamp === "1h" || post.timestamp === "3h")
                      .map((post, index) => (
                        <Post key={index} {...post} />
                      ))}
                  </TabsContent>
                  <TabsContent value="latest">
                    {posts.map((post, index) => (
                      <Post key={index} {...post} />
                    ))}
                  </TabsContent>
                </Tabs>
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

