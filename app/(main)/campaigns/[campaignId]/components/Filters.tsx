import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Filters() {
    return (
        <div className="flex items-center justify-between py-4">
            <Input placeholder="Filter emails..." className="max-w-sm" />
            <div>
                <Button>Filters</Button>
            </div>
        </div>
    );
}
