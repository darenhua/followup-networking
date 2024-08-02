import { getUserOrRedirect } from '@/lib/auth'
import Navbar from './components/DesktopNavbar'
import MobileNavbar from './components/MobileNavbar'
import ProfileDropdown from './components/ProfileDropdown'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUserOrRedirect()

    return (
        <div className="h-screen min-h-screen w-full">
            <Navbar />
            <header className="fixed z-20 flex h-14 w-full items-center justify-between gap-4 border-b bg-muted px-4 md:hidden">
                <MobileNavbar />
                <ProfileDropdown />
            </header>
            <div className="flex h-full w-full flex-col pt-20 md:pl-72 md:pt-3">{children}</div>
        </div>
    )
}
