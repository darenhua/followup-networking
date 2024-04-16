import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CtaCard from "./CtaCard";
import Navbar from "./Navbar";

export default async function MobileNavbar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Follow Up</span>
                    </Link>

                    <Navbar />
                </nav>
                <div className="mt-auto">
                    <CtaCard />
                </div>
            </SheetContent>
        </Sheet>
    );
}
