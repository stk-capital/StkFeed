"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Share2, Star } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface PostProps {
  company: string
  handle: string
  source: string
  title: string
  content: string
  timestamp: string
  avatar: string
}

export function Post({ company, handle, source, title, content, timestamp, avatar }: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="border-b p-4 hover:bg-gray-50">
      <div className="flex space-x-3">
        <Link href={`/profile/${handle}`}>
          <Avatar>
            <AvatarImage src={avatar} alt={company} />
            <AvatarFallback>{company[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <Link href={`/profile/${handle}`} className="font-bold hover:underline">
              {company}
            </Link>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{source}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{timestamp}</span>
          </div>
          <h3 className="font-semibold mt-1">{title}</h3>
          <p className="mt-1">{isExpanded ? content : `${content.slice(0, 100)}...`}</p>
          {content.length > 100 && (
            <Button variant="ghost" size="sm" onClick={toggleExpand} className="mt-2 text-blue-500 hover:text-blue-600">
              {isExpanded ? "Show less" : "Show more"}
            </Button>
          )}
          <div className="flex justify-between mt-3 max-w-md">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
              <ThumbsUp className="w-4 h-4 mr-2" />
              <span>33</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
              <ThumbsDown className="w-4 h-4 mr-2" />
              <span>5</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
              <Share2 className="w-4 h-4 mr-2" />
              <span>Share</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-yellow-500">
              <Star className="w-4 h-4 mr-2" />
              <span>Follow</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

