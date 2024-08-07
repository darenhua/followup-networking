import { AuthenticatedHttpClient } from '@/lib/axios'
import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { cache } from 'react'

interface Campaign {
    id: string
    name: string
    count: number
    status: string
}

const getCampaigns = cache(async (): Promise<Campaign[]> => {
    const httpClient = await AuthenticatedHttpClient()
    const res = await httpClient.get('/campaign')
    const campaignNames = res.data['distinct_campaigns']

    const campaigns: Campaign[] = await Promise.all(
        campaignNames.map(async (name: string, id: number) => {
            const count = res.data['campaign_emails'].filter((email: any) => email.campaign_name === name).length
            const statusRes = await httpClient.post('get_campaign_status/', {
                campaign_name: name,
            })
            return {
                id,
                name,
                count,
                status: statusRes.data['status'],
            }
        }),
    )
    return campaigns
})

export default async function Page() {
    const campaigns = await getCampaigns()

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
                        <h3 className="text-2xl font-bold tracking-tight">You have no campaigns</h3>
                        <p className="text-sm text-muted-foreground">Contact Follow Up support to create a campaign.</p>
                    </div>
                </div>
            )}
        </main>
    )
}

function CampaignItem({ campaign }: { campaign: Campaign }) {
    return (
        <Link href={`/campaigns/${campaign.name}`}>
            <div className="flex flex-1 items-center justify-between rounded-lg border px-8 py-6 shadow-sm hover:bg-zinc-50">
                <div className="flex items-center gap-6">
                    <h3 className="text-2xl font-bold">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">Contains {campaign.count} Leads</p>
                    <StatusBadge status={campaign.status} />
                </div>
                <div>
                    <SquareArrowOutUpRight className="h-6 w-6" />
                </div>
            </div>
        </Link>
    )
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
