'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'

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
            const email = row.original

            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size={'icon'} variant="ghost">
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm remove from campaign.</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to remove {email.email} from your campaign?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={async () => {
                                    await console.log('hi')
                                }}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        },
    },
    // ...
]
