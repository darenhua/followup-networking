'use client'

import { ButtonWithLoader } from '@/components/ButtonWithLoader'
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
import { Trash2 } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'
import { removeFromCampaignAction } from '../actions/remove-from-campaign'

export default function RemoveButton({ campaignName, deleteEmail }: { campaignName: string; deleteEmail: string }) {
    const [open, setOpen] = useState(false)

    const removeFromCampaign = useAction(removeFromCampaignAction, {
        onSuccess: () => {
            setOpen(false)
            toast.success(`Lead deleted from ${campaignName}`)
        },
        onError: () => {
            toast.error('Sorry, something went wrong.')
        },
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size={'icon'} variant="ghost">
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm remove from campaign.</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to remove {deleteEmail} from your campaign?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <ButtonWithLoader
                            action={removeFromCampaign}
                            params={{
                                delete_list: [deleteEmail],
                                campaign_name: campaignName,
                            }}
                        >
                            Continue
                        </ButtonWithLoader>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
