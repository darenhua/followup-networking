'use client'

import { ColumnDef } from '@tanstack/react-table'
import RemoveButton from './RemoveButton'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CampaignEmail = {
    id: number
    email: string
    first_name: string
    last_name: string
    company: string
    type: string
    location: string
    title: string
    university: string
    campaign_name: string
}

export const columns: ColumnDef<CampaignEmail>[] = [
    {
        header: 'Contact',
        cell: ({ row }) => {
            return (
                <div className="mr-3 min-w-48 max-w-64">
                    <div className="font-medium text-gray-900">
                        {' '}
                        <span>{row.original.first_name} </span>
                        <span>{row.original.last_name}</span>
                    </div>
                    <div className="mt-1 text-gray-500">
                        {row.original.title} at {row.original.company}
                    </div>
                </div>
            )
        },
    },

    {
        header: 'Email',
        cell: ({ row }) => {
            return <p className="overflow-clip text-wrap">{row.original.email}</p>
        },
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'location',
        header: 'Location',
    },
    {
        accessorKey: 'university',
        header: 'University',
    },
    {
        id: 'remove',
        cell: ({ row }) => {
            const lead = row.original

            return <RemoveButton campaignName={lead.campaign_name} deleteEmail={lead.email} />
        },
    },
    // ...
]
