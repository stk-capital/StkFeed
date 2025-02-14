import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TrendingTopic {
  id: string
  title: string
  category: string
  posts: number
  summary: string
}

const trendingTopics: TrendingTopic[] = [
  {
    id: "openai-roadmap",
    title: "OpenAI's AI Evolution: GPT-4.5 and GPT-5 Roadmap Unveiled",
    category: "Technology",
    posts: 17000,
    summary:
      "OpenAI, under CEO Sam Altman, has outlined its future plans for AI model development, announcing the imminent release of GPT-4.5, known internally as Orion, as the last model without chain-of-thought reasoning capabilities.",
  },
  {
    id: "dubai-loop",
    title: "Dubai Loop: Musk's Underground Project",
    category: "Transportation",
    posts: 2600,
    summary:
      "Elon Musk's The Boring Company has announced a new underground transportation system in Dubai, expanding their tunnel network globally.",
  },
  {
    id: "trump-putin",
    title: "Trump-Putin Talks Signal Shift in Ukraine Policy",
    category: "Politics",
    posts: 1500,
    summary:
      "Recent discussions between former President Trump and Vladimir Putin have sparked debates about potential changes in Ukraine policy.",
  },
]

export function TrendBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trendingTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/trending/${topic.id}`}
              className="block -mx-2 px-2 py-1 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="text-sm text-muted-foreground">{topic.category} · Trending</div>
              <div className="font-medium text-base">{topic.title}</div>
              <div className="text-sm text-muted-foreground">{(topic.posts / 1000).toFixed(1)}K posts</div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

