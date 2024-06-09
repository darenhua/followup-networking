'use client'

import { cn } from '@/lib/utils'
import { Home, Package, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const navLinks = [
        {
            title: 'Dashboard',
            icon: Home,
            href: '/',
        },
        {
            title: 'Campaigns',
            icon: ShoppingCart,
            href: '/campaigns',
        },
        {
            title: 'Contacts',
            icon: Package,
            href: '/contacts',
        },
        {
            title: 'Templates',
            icon: Package,
            href: '/templates',
        },
    ]

    const pathname = usePathname()

    const checkIsActive = (path: string) => {
        if (path === '/' && pathname !== path) {
            return false
        }
        return pathname.startsWith(`${path}`)
    }

    return (
        <>
            {navLinks.map(({ title, icon: Icon, href }) => {
                return (
                    <Link
                        key={title}
                        href={href}
                        className={cn(
                            checkIsActive(href) ? 'bg-muted text-foreground' : 'text-muted-foreground',
                            'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
                        )}
                    >
                        <Icon className="h-5 w-5"></Icon>
                        {title}
                    </Link>
                )
            })}
        </>
    )
}
