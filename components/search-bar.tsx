import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function SearchBar() {
  return (
    <Card className="mb-4">
      <div className="relative p-4">
        <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search companies" className="pl-10" />
      </div>
    </Card>
  )
}

