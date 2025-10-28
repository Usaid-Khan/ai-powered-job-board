"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { SignOutButton } from "@/src/services/clerk/components/AuthButtons"
import { useClerk } from "@clerk/nextjs"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ChevronsUpDown, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"
import Link from "next/link"

type User = {
    name: string
    imageUrl: string
    email: string
}

export function SidebarUserButtonClient({ user }: { user: User }) {
    const { isMobile, setOpenMobile } = useSidebar()
    const { openUserProfile } = useClerk()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <UserInfo {...user} />
                    <ChevronsUpDown className="ml-auto group-data-[state=collapsed]:hidden" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={4} align="end" side={isMobile ? "bottom" : "right"} className="min-w-64 max-w-80">
                <DropdownMenuLabel className="font-normal p-1">
                    <UserInfo {...user} />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    openUserProfile()
                    setOpenMobile(false)
                }} className="flex items-center cursor-pointer m-2 hover:bg-neutral-800 rounded">
                    <UserIcon className="mr-2 text-gray-400 w-4" /> <div className="text-sm">Profile</div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="m-2">
                    <Link href="/user-settings/notifications" className="flex items-center hover:bg-neutral-800 rounded">
                        <SettingsIcon className="mr-2 text-gray-400 w-4" /> <div className="text-sm">Settings</div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <SignOutButton>
                    <DropdownMenuItem className="m-2 flex items-center cursor-pointer hover:bg-neutral-800 rounded">
                        <LogOutIcon className="mr-2 text-gray-400 w-4" /> <div className="text-sm">Log Out</div>
                    </DropdownMenuItem>
                </SignOutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function UserInfo({ imageUrl, email, name }: User) {
    const nameInitials = name
        .split(" ")
        .slice(0, 2)
        .map(str => str[0])
        .join("")

    return (
        <div className="flex items-center gap-2 overflow-hidden">
            <Avatar className="rounded-lg size-8">
                <AvatarImage src={imageUrl} alt={name} />
                <AvatarFallback className="uppercase bg-primary text-primary-foreground">
                    {nameInitials}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state=collapsed]:hidden">
                <span className="truncate text-sm font-semibold">{name}</span>
                <span className="truncate text-xs font-semibold">{email}</span>
            </div>
        </div>
    )
}