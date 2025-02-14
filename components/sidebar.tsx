"use client"

import Link from "next/link"
import { Home, Bell, Mail, BarChart2, ChevronRight, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type React from "react"

interface User {
  name: string
  email: string
  avatar: string
}

const sectors = ["Technology", "Healthcare", "Finance", "Consumer Goods", "Energy", "Industrials"]

export function Sidebar() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  return (
    <div className="fixed top-0 left-0 w-64 h-screen border-r bg-background hidden md:flex md:flex-col">
      <div className="p-4">
        <Link href="/" className="flex px-3 py-2 mb-4">
          <span className="text-xl font-bold">STK Feed</span>
        </Link>
        <nav className="space-y-1">
          <NavItem href="/" icon={Home}>
            Home
          </NavItem>
          <NavItem href="/notifications" icon={Bell}>
            Notifications
          </NavItem>
          <NavItem href="#" icon={Mail}>
            Messages
          </NavItem>
        </nav>
        <div className="mt-8 space-y-4">
          <h3 className="font-semibold flex items-center text-xl">
            <BarChart2 className="w-5 h-5 mr-2" />
            Sectors
          </h3>
          <div className="grid gap-2">
            {sectors.map((sector) => (
              <SectorButton key={sector}>{sector}</SectorButton>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto p-4 border-t">
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogIn className="w-4 h-4 rotate-180" />
            </Button>
          </div>
        ) : (
          <Button className="w-full" onClick={() => router.push("/login")}>
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        )}
      </div>
    </div>
  )
}

function NavItem({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  )
}

function SectorButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-between text-left font-normal hover:font-medium text-muted-foreground hover:text-accent-foreground"
    >
      {children}
      <ChevronRight className="w-4 h-4 opacity-50" />
    </Button>
  )
}

