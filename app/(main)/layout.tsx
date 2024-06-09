import { getUserOrRedirect } from '@/lib/auth'
import Navbar from './components/DesktopNavbar'
import MobileNavbar from './components/MobileNavbar'
import ProfileDropdown from './components/ProfileDropdown'
import Searchbar from './components/Searchbar'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUserOrRedirect()

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Navbar />
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <MobileNavbar />
                    <div className="w-full flex-1">
                        <Searchbar />
                    </div>
                    <ProfileDropdown />
                </header>
                {children}
            </div>
        </div>
    )
}
