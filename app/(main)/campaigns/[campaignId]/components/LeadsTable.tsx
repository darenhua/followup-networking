import { z } from 'zod'
import { CampaignEmail, columns } from './Columns'
import DataTable from './DataTable'
import Filters, { filtersFormSchema } from './Filters'
import PaginationControls from './PaginationControls'

interface PaginationProps {
    limit: number
    page: number
    total: number
    from: number
    to: number
}

export default async function LeadsTable({
    defaultValues,
    filterOptions,
    search,
    paginationProps,
    campaigns,
    campaignId,
}: {
    defaultValues: z.infer<typeof filtersFormSchema>
    filterOptions: {
        typeOptions: string[]
        companyOptions: string[]
        locationOptions: string[]
        universityOptions: string[]
    }
    search: string | null
    paginationProps: PaginationProps
    campaigns: CampaignEmail[]
    campaignId: string
}) {
    return (
        <>
            <Filters
                search={search}
                defaultValues={defaultValues}
                filterOptions={filterOptions}
                campaignId={campaignId}
            />
            <div className="mt-3">
                <DataTable columns={columns} data={campaigns} />
            </div>
            <PaginationControls
                limit={paginationProps.limit}
                page={paginationProps.page}
                total={paginationProps.total}
                from={paginationProps.from}
                to={paginationProps.to}
                campaignId={campaignId}
            />
        </>
    )
}
