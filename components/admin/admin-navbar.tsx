"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Menu } from "lucide-react"

interface AdminNavbarProps {
  onMenuClick?: () => void
}

export function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-4 w-4" />
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users, jobs, applications..." className="w-64 pl-9" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">New application received</p>
                  <p className="text-xs text-muted-foreground">John Doe applied for Senior Developer</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Job posting expires soon</p>
                  <p className="text-xs text-muted-foreground">Marketing Manager expires in 2 days</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">Jane Smith joined as job seeker</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Active Jobs:</span>
              <Badge variant="secondary">24</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Pending:</span>
              <Badge variant="outline">12</Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
