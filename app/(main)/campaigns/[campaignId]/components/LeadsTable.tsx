import DataTable from "./DataTable";
import { Payment, columns } from "./Columns";
import PaginationControls from "./PaginationControls";
import Filters from "./Filters";

const payments: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
];

interface PaginationProps {
    limit: number;
    page: number;
    total: number;
    from: number;
    to: number;
}

export default async function LeadsTable({
    paginationProps,
    campaignId,
}: {
    paginationProps: PaginationProps;
    campaignId: string;
}) {
    // const { data, error } = await supabase
    //     .from('hra_claims')
    //     .select('*')
    //     .eq('organization_id', activeOrg.orgId)
    //     .eq('user_id', user.userId)
    //     .is('cancelled', false)
    //     .order('created_at', { ascending: false })
    //     .range(from, to - 1) // because supabase range end is inclusive

    return (
        <>
            <Filters />
            <DataTable columns={columns} data={payments} />
            <PaginationControls
                limit={paginationProps.limit}
                page={paginationProps.page}
                total={paginationProps.total}
                from={paginationProps.from}
                to={paginationProps.to}
                campaignId={campaignId}
            />
        </>
    );
}
