import { Heart, MessageCircle, Repeat, Share } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TweetProps {
  username: string
  handle: string
  content: string
  timestamp: string
  avatar: string
}

export function Tweet({ username, handle, content, timestamp, avatar }: TweetProps) {
  return (
    <div className="border-b p-4 hover:bg-gray-50">
      <div className="flex space-x-3">
        <Link href={`/profile/${handle}`}>
          <Avatar>
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <Link href={`/profile/${handle}`} className="font-bold hover:underline">
              {username}
            </Link>
            <span className="text-gray-500">@{handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{timestamp}</span>
          </div>
          <p className="mt-1">{content}</p>
          <div className="flex justify-between mt-3 max-w-md">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>33</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
              <Repeat className="w-4 h-4 mr-2" />
              <span>5</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
              <Heart className="w-4 h-4 mr-2" />
              <span>21</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

