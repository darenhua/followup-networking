'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/lib/auth'
import { CircleUser } from 'lucide-react'
import Link from 'next/link'
import { useTransition } from 'react'
import Navbar from './Navbar'

export default function DesktopNavbar() {
    const [isPending, startTransition] = useTransition()

    return (
        <>
            <div className="hidden border-r bg-muted/40 md:fixed md:block md:h-full md:w-72">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <span className="">Follow Up Networking</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Navbar />
                        </nav>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex cursor-pointer items-center gap-4 rounded-xl border-t py-2 hover:bg-muted/60 active:bg-muted/60">
                                <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-medium leading-6 text-gray-900">
                                    <div>
                                        <CircleUser className="h-5 w-5" />
                                        <span className="sr-only">Toggle user menu</span>
                                    </div>
                                    <span className="sr-only">Your profile</span>
                                    <span className="" aria-hidden="true">
                                        My Account
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-64">
                            <DropdownMenuItem>
                                <Link href="mailto:dhua@hamilton.edu">Contact Support</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/onboarding">Redo Onboarding</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => startTransition(() => logout())}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}
