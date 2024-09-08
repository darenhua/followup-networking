import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { AuthenticatedHttpClient } from '@/lib/axios'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import LaunchButton from './components/LaunchButton'
import LeadsTable from './components/LeadsTable'
import PauseButton from './components/PauseButton'

export default async function Page({
    params,
    searchParams,
}: {
    params: { campaignId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    // Pagination logic
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 50
    const { from, to } = { from: (page - 1) * limit, to: page * limit }

    for (const searchParam of Object.values(searchParams)) {
        if (Array.isArray(searchParam)) {
            throw new Error('Sorry, something went wrong!')
        }
    }

    // Filtering options
    const defaultFilters = {
        typeFilter: (searchParams.typeFilter ?? '') as string,
        companyFilter: (searchParams.companyFilter ?? '') as string,
        locationFilter: (searchParams.locationFilter ?? '') as string,
        universityFilter: (searchParams.universityFilter ?? '') as string,
    }
    const search = (searchParams.search ?? '') as string

    const backendSearchParams = new URLSearchParams(defaultFilters)

    const httpClient = await AuthenticatedHttpClient()
    const res = await httpClient.get(
        `/campaign/?${backendSearchParams.toString()}&page=${page}&campaignFilter=${params.campaignId}`,
    )
    const campaignEmails = res.data['campaign_emails'].filter(
        // @ts-ignore
        (email: string) => email.campaign_name === params.campaignId,
    )

    const filterOptions = {
        typeOptions: res.data.distinct_types,
        companyOptions: res.data.distinct_companies,
        locationOptions: res.data.distinct_locations,
        universityOptions: res.data.distinct_university,
    }

    let campaignTotal = 0
    if (campaignEmails.length > 0) {
        const userId = campaignEmails[0]['user']
        const campaignTotalRes = await httpClient.get(
            `/leads/total?campaign_name=${params.campaignId}&user_id=${userId}`,
        )
        campaignTotal = campaignTotalRes.data['total_leads']
    }

    const paginationProps = {
        limit,
        page,
        total: campaignTotal,
        from,
        to,
    }
    const statusRes = await httpClient.post('/get_campaign_status/', {
        campaign_name: params.campaignId,
    })

    const status = statusRes.data['status']
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="mt-2 flex flex-col justify-center">
                <Breadcrumbs links={[{ label: 'Campaigns', href: '/campaigns' }, { label: params.campaignId }]} />
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="w-fit text-lg font-semibold capitalize md:text-2xl">
                            {params.campaignId} Campaign
                        </h1>
                        <div>
                            <StatusBadge status={status} />
                        </div>
                    </div>
                    <InstantlyButton status={status} campaignName={params.campaignId} />
                </div>
            </div>
            <div className="flex flex-1 flex-col">
                <LeadsTable
                    defaultValues={defaultFilters}
                    filterOptions={filterOptions}
                    search={search}
                    paginationProps={paginationProps}
                    campaigns={campaignEmails}
                    campaignId={params.campaignId}
                />
            </div>
        </main>
    )
}

function InstantlyButton({ status, campaignName }: { status: string; campaignName: string }) {
    switch (status) {
        case 'active':
            return <PauseButton campaignName={campaignName} />
        case 'paused':
            return <LaunchButton campaignName={campaignName} />
        default:
            return (
                <Link href="mailto:followupnowinfo@gmail.com">
                    <Button size="sm" variant={'destructive'} className="w-full">
                        <Mail className="mr-3 h-4 w-4" />
                        Contact Follow Up Support
                    </Button>
                </Link>
            )
    }
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'active':
            return (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Active
                </span>
            )
        case 'paused':
            return (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                    Paused
                </span>
            )
        default:
            return (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                    {status}
                </span>
            )
    }
}
