import Link from "next/link"
import { Home, Bell, Mail, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden">
      <div className="flex justify-around items-center h-16">
        <NavItem href="/" icon={Home} />
        <NavItem href="/notifications" icon={Bell} />
        <NavItem href="#" icon={Search} />
        <NavItem href="#" icon={Mail} />
      </div>
    </nav>
  )
}

function NavItem({ href, icon: Icon }: { href: string; icon: React.ElementType }) {
  return (
    <Link href={href}>
      <Button variant="ghost" size="icon" className="h-12 w-12">
        <Icon className="h-6 w-6" />
      </Button>
    </Link>
  )
}

