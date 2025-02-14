import { Post } from "./post"

const posts = [
  {
    company: "Tesla",
    handle: "tesla",
    source: "The Information",
    title: "Tesla Announces New Battery Technology",
    content:
      "Tesla announces new battery technology that could significantly increase range. The new cells, which Tesla is calling 4680 cells, will enable electric cars to have a much longer range and be more affordable. This breakthrough is expected to revolutionize the electric vehicle industry and accelerate the transition to sustainable energy.",
    timestamp: "2h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    company: "Apple",
    handle: "apple",
    source: "Bloomberg",
    title: "Apple's M2 Chip Outperforms Competitors",
    content:
      "Apple's new M2 chip outperforms competitors in benchmark tests. The latest iteration of Apple's custom silicon shows significant improvements in both CPU and GPU performance, solidifying Apple's position as a leader in chip design. This development is expected to have far-reaching implications for the personal computing industry.",
    timestamp: "5h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    company: "Amazon",
    handle: "amazon",
    source: "Wall Street Journal",
    title: "Amazon Expands Same-Day Delivery Service",
    content:
      "Amazon expands same-day delivery service to more cities. This move is part of Amazon's strategy to improve its logistics network and provide faster delivery options to customers. The expansion is expected to put pressure on traditional retailers and further cement Amazon's dominance in the e-commerce sector.",
    timestamp: "7h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

interface PostListProps {
  type: "following" | "for-you"
  filter?: (post: any) => boolean
}

export function PostList({ type, filter }: PostListProps) {
  const filteredPosts = filter ? posts.filter(filter) : posts

  return (
    <div>
      {filteredPosts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  )
}

