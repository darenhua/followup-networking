import Link from "next/link";
import { Package2 } from "lucide-react";
import CtaCard from "./CtaCard";
import Navbar from "./Navbar";

export default async function DesktopNavbar() {
    return (
        <>
            <div className="bg-muted/40 hidden border-r md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="">Follow Up</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Navbar />
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <CtaCard />
                    </div>
                </div>
            </div>
        </>
    );
}
