import { Tweet } from "./tweet"

const tweets = [
  {
    username: "Elon Musk",
    handle: "elonmusk",
    content: "Exciting times ahead for X! Stay tuned for our latest innovations.",
    timestamp: "2h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    username: "NASA",
    handle: "NASA",
    content: "New images from the James Webb Space Telescope reveal unprecedented details of distant galaxies.",
    timestamp: "5h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    username: "Tech Insider",
    handle: "techinsider",
    content: "Breaking: Major tech company announces revolutionary AI-powered product. Full story coming soon.",
    timestamp: "7h",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TweetList() {
  return (
    <div>
      {tweets.map((tweet, index) => (
        <Tweet key={index} {...tweet} />
      ))}
    </div>
  )
}

