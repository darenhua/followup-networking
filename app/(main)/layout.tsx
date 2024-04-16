// import { cookies, headers } from 'next/headers'
// import { redirect } from "nxext/navigation";

import ProfileDropdown from "./components/ProfileDropdown";
import Searchbar from "./components/Searchbar";
import Navbar from "./components/DesktopNavbar";
import MobileNavbar from "./components/MobileNavbar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const pathname = usePathname();
    // const activeOrg = headers().get('activeOrg') || cookies().get('activeOrg')
    // GET COOKIES
    // If not authenticated, redirect

    // if (user.getOrgs().length !== 0) {
    //     redirect("/");
    // }
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Navbar />
            <div className="flex flex-col">
                <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
                    <MobileNavbar />
                    <div className="w-full flex-1"></div>
                    <ProfileDropdown />
                </header>
                {children}
            </div>
        </div>
    );
}
