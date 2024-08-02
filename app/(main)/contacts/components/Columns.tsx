'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Contact = {
    id: number
    first_name: string
    last_name: string
    email: string
    title: string
    company: string
    type: string
    location: string
    level: string
    university: string
    linkedin: string
}

export const columns: ColumnDef<Contact>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className="ml-1 mr-3">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="ml-1 mr-3">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
    },
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
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'location',
        header: 'Location',
    },
    {
        accessorKey: 'level',
        header: 'Level',
    },
    {
        accessorKey: 'university',
        header: 'University',
    },
    {
        id: 'linkedin',
        header: ({ table }) => <div className="mx-3">LinkedIn</div>,
        cell: ({ row }) => {
            const contact = row.original

            return (
                <Link className="mx-3 text-blue-500" href={contact.linkedin} target="_blank">
                    LinkedIn
                </Link>
            )
        },
    },
    {
        id: 'details',
        cell: ({ row }) => {
            const contact = row.original

            return (
                <Button variant="secondary" className="hover:bg-gray-300/60" size="sm" asChild>
                    <Link href={`/contacts/${contact.id}`}>Details</Link>
                </Button>
            )
        },
    },
]
