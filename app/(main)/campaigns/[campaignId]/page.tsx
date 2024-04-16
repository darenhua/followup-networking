import Breadcrumbs from "@/components/Breadcrumbs";
import LeadsTable from "./components/LeadsTable";

const campaigns = [
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

export default async function Page({
    params,
    searchParams,
}: {
    params: { campaignId: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const campaignId = params.campaignId;
    const campaign = campaigns[Number(campaignId) - 1];

    // Pagination logic
    const page =
        typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
    const limit =
        typeof searchParams.limit === "string"
            ? Number(searchParams.limit)
            : 10;
    const { from, to } = { from: (page - 1) * limit, to: page * limit };

    const paginationProps = {
        limit,
        page,
        total: 2,
        from,
        to,
    };

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="mt-2 flex flex-col justify-center">
                <Breadcrumbs
                    links={[
                        { label: "Campaigns", href: "/campaigns" },
                        { label: campaign.name },
                    ]}
                />
                <h1 className="mt-6 text-lg font-semibold capitalize md:text-2xl">
                    {campaign.name} Campaign
                </h1>
            </div>
            <div className="flex flex-1 flex-col">
                <LeadsTable
                    paginationProps={paginationProps}
                    campaignId={campaignId}
                />
            </div>
        </main>
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
