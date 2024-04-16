import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

interface Campaign {
    id: string; // this is a uuid
    name: string;
    count: number;
    status: string;
}
// generate two items of test data with id as a random uuid:
const campaigns: Campaign[] = [
    {
        id: "1",
        name: "Alumni",
        count: 100,
        status: "launched",
    },
    {
        id: "2",
        name: "Recruiter",
        count: 200,
        status: "paused",
    },
];

export default async function Page() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Campaigns</h1>
            </div>
            <div className="flex flex-1 flex-col gap-6">
                {campaigns.map((campaign) => (
                    <CampaignItem key={campaign.id} campaign={campaign} />
                ))}
            </div>

            {campaigns.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            You have no products
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            You can start selling as soon as you add a product.
                        </p>
                        {/* <Button className="mt-4">Add Product</Button> */}
                    </div>
                </div>
            )}
        </main>
    );
}

function CampaignItem({ campaign }: { campaign: Campaign }) {
    return (
        <Link href={`/campaigns/${campaign.id}`}>
            <div className="flex flex-1 items-center justify-between rounded-lg border px-8 py-6 shadow-sm hover:bg-zinc-50">
                <div className="flex items-center gap-6">
                    <h3 className="text-2xl font-bold">{campaign.name}</h3>
                    <p className="text-muted-foreground text-sm">
                        {campaign.count} Leads
                    </p>
                    <StatusBadge status={campaign.status} />
                </div>
                <div>
                    <SquareArrowOutUpRight className="h-6 w-6" />
                </div>
            </div>
        </Link>
    );
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "launched":
            return (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Launched
                </span>
            );
        case "paused":
            return (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                    Paused
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                    {status}
                </span>
            );
    }
}
