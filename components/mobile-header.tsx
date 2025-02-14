"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

interface User {
  name: string
  email: string
  avatar: string
}

export function MobileHeader() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <div className="flex items-center justify-between p-4 border-b md:hidden">
      <div>
        {user ? (
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <Button variant="ghost" size="sm" onClick={handleLogin}>
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        )}
      </div>
      <h1 className="text-xl font-bold">STK Feed</h1>
      <div className="w-8" /> {/* Placeholder for right side to balance the layout */}
    </div>
  )
}

