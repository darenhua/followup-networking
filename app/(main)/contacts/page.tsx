import Link from "next/link";
import DataTable from "./components/DataTable";
import { Contact, columns } from "./components/Columns";
import PaginationControls from "./components/PaginationControls";
import Filters from "./components/Filters";

const contacts: Contact[] = [
    {
        id: "1",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "2",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
];

export default async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
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
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Contacts</h1>
            </div>

            {contacts.length > 0 && (
                <div className="flex flex-1 flex-col">
                    <Filters />
                    <DataTable columns={columns} data={contacts} />
                    <PaginationControls
                        limit={paginationProps.limit}
                        page={paginationProps.page}
                        total={paginationProps.total}
                        from={paginationProps.from}
                        to={paginationProps.to}
                    />
                </div>
            )}

            {contacts.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            You have no contacts
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            Contact Follow Up support to gain access to over
                            10,000+ connections.
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
}
