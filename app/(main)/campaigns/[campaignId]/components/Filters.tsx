import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function Filters() {
    return (
        <div className="flex items-center justify-between py-2">
            <Input placeholder="Filter emails..." className="max-w-sm" />
            <div>
                <Button>
                    <Filter className="mr-3 h-4 w-4" /> Filters
                </Button>
            </div>
        </div>
    );
}
