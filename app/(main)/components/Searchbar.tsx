import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function Searchbar() {
    return (
        <form>
            <div className="relative">
                <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                <Input
                    type="search"
                    placeholder="Search leads..."
                    className="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
            </div>
        </form>
    );
}
