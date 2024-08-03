'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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

export default function StackedChart({ campaignSummaries }: { campaignSummaries: CampaignSummary[] }) {
    const leads = campaignSummaries.reduce((acc, curr) => {
        // @ts-ignore
        acc[curr.campaign_name] = curr.total_leads
        return acc
    }, {})
    const contacted = campaignSummaries.reduce((acc, curr) => {
        // @ts-ignore
        acc[curr.campaign_name] = curr.contacted
        return acc
    }, {})
    const reads = campaignSummaries.reduce((acc, curr) => {
        // @ts-ignore
        acc[curr.campaign_name] = curr.leads_who_read
        return acc
    }, {})
    const replies = campaignSummaries.reduce((acc, curr) => {
        // @ts-ignore
        acc[curr.campaign_name] = curr.leads_who_replied
        return acc
    }, {})

    const completes = campaignSummaries.reduce((acc, curr) => {
        // @ts-ignore
        acc[curr.campaign_name] = curr.completed
        return acc
    }, {})

    const chartData = [
        { category: 'Leads', ...leads },
        { category: 'Contacted', ...contacted },
        { category: 'Read', ...reads },
        { category: 'Replied', ...replies },
        { category: 'Completed', ...completes },
    ]

    const chartConfig = campaignSummaries.reduce((acc, curr, id) => {
        // @ts-ignore
        acc[curr.campaign_name] = {
            label: curr.campaign_name,
            color: `hsl(var(--chart-${id + 1}))`,
        }
        return acc
    }, {}) satisfies ChartConfig

    const radii = campaignSummaries.map((_, i): [number, number, number, number] => {
        if (i === 0) return [0, 0, 4, 4]
        if (i === campaignSummaries.length - 1) return [4, 4, 0, 0]
        return [0, 0, 0, 0]
    })

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Your Campaigns</CardTitle>
                <CardDescription>Analytics for your campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend className="mt-6" content={<ChartLegendContent />} />
                        {campaignSummaries.map((summary, i) => {
                            return (
                                <Bar
                                    key={i}
                                    dataKey={summary.campaign_name}
                                    stackId="a"
                                    fill={`var(--color-${summary.campaign_name})`}
                                    radius={radii[i]}
                                />
                            )
                        })}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
