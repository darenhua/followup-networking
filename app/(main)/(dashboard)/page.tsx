import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { AuthenticatedHttpClient } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { Check, MessageCircleReply, Send, SquareArrowOutUpRight, UserRound } from 'lucide-react'
import Link from 'next/link'
import { cache } from 'react'
import StackedChart from './components/StackedChart'

interface CampaignSummary {
    campaign_id: string
    campaign_name: string
    total_leads: number
    in_progress: number
    skipped: number
    contacted: number
    not_yet_contacted: number
    leads_who_read: number
    leads_who_replied: number
    bounced: number
    unsubscribed: number
    completed: number
}

const getCampaignSummaries = cache(async (): Promise<CampaignSummary[]> => {
    const httpClient = await AuthenticatedHttpClient()
    const res = await httpClient.get('/campaign')
    const campaignNames = res.data['distinct_campaigns']

    const campaignSummaries: CampaignSummary[] = await Promise.all(
        campaignNames.map(async (name: string, id: number) => {
            const summary = await httpClient.post('get_campaign_summary/', { campaign_name: name })
            return summary.data
        }),
    )

    return campaignSummaries
})

export default async function Page() {
    const campaignSummaries = await getCampaignSummaries()
    const campaignNames = campaignSummaries.map((summary) => summary.campaign_name)
    const totalSummary: Partial<CampaignSummary> = campaignSummaries.reduce(
        (acc, curr) => {
            return {
                total_leads: acc.total_leads + curr.total_leads,
                contacted: acc.contacted + curr.contacted,
                leads_who_read: acc.leads_who_read + curr.leads_who_read,
                leads_who_replied: acc.leads_who_replied + curr.leads_who_replied,
                completed: acc.completed + curr.completed,
            }
        },
        {
            total_leads: 0,
            contacted: 0,
            leads_who_read: 0,
            leads_who_replied: 0,
            completed: 0,
        },
    )

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <main className="flex flex-1 flex-col gap-3  md:gap-6">
                <div className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                            <UserRound className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSummary.total_leads}</div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Emails Sent</CardTitle>
                            <Send className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSummary.contacted}</div>
                            <p className="text-xs text-muted-foreground">
                                ({(totalSummary!.contacted! / totalSummary!.total_leads!).toFixed(2)})% of leads
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Emails Read</CardTitle>
                            <Check className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSummary.leads_who_read}</div>
                            <p className="text-xs text-muted-foreground">
                                ({(totalSummary!.leads_who_read! / totalSummary!.total_leads!).toFixed(2)})% of leads
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Email Replied</CardTitle>
                            <MessageCircleReply className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSummary.leads_who_replied}</div>
                            <p className="text-xs text-muted-foreground">
                                ({(totalSummary!.leads_who_replied! / totalSummary!.total_leads!).toFixed(2)})% of leads
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
                    <StackedChart campaignSummaries={campaignSummaries} />
                    <Card className="lg:col-span-1" x-chunk="dashboard-01-chunk-5">
                        <CardHeader className="pb-6">
                            <CardTitle>Campaign Analytics</CardTitle>
                        </CardHeader>
                        <div>
                            {campaignSummaries.map((campaign, id) => {
                                return (
                                    <div key={id}>
                                        <CardHeader
                                            className={cn(
                                                id === 0 && 'border-t',
                                                'flex flex-row items-center justify-between space-y-0 pb-2 pt-5',
                                            )}
                                        >
                                            <CardTitle className="text-base font-medium">
                                                {campaign.campaign_name}
                                            </CardTitle>
                                            <Link href={`/campaigns/${campaign.campaign_name}`}>
                                                <SquareArrowOutUpRight className="h-4 w-4 text-muted-foreground" />
                                            </Link>
                                        </CardHeader>
                                        <CardContent
                                            className={cn(id === campaignSummaries.length - 1 || 'border-b', 'pb-2')}
                                        >
                                            <ScrollArea className="mt-3">
                                                <div className="mb-3 flex gap-12">
                                                    <div className="flex flex-col items-center">
                                                        <div className="text-xl font-bold">{campaign.total_leads}</div>
                                                        <p className="text-xs text-muted-foreground">Leads</p>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <div className="text-xl font-bold">{campaign.contacted}</div>
                                                        <p className="text-xs text-muted-foreground">Contacted</p>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <div className="text-xl font-bold">
                                                            {campaign.leads_who_read}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">Read</p>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <div className="text-xl font-bold">
                                                            {campaign.leads_who_replied}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">Replied</p>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <div className="text-xl font-bold">{campaign.completed}</div>
                                                        <p className="text-xs text-muted-foreground">Completed</p>
                                                    </div>
                                                </div>

                                                <ScrollBar orientation="horizontal" />
                                            </ScrollArea>
                                        </CardContent>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                </div>
            </main>
            {campaignNames.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">You have no campaigns</h3>
                        <p className="text-sm text-muted-foreground">
                            Contact Follow Up support to gain access to over 10,000+ connections.
                        </p>
                    </div>
                </div>
            )}
        </main>
    )
}
