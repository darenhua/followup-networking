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
import { Pause } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'
import { pauseCampaignAction } from '../actions/pause-campaign'

export default function PauseButton({ campaignName }: { campaignName: string }) {
    const [open, setOpen] = useState(false)

    const pauseCampaign = useAction(pauseCampaignAction, {
        onSuccess: () => {
            setOpen(false)
            toast.success(`Campaign ${campaignName} paused.`)
        },
        onError: () => {
            toast.error('Sorry, something went wrong.')
        },
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                    <Pause className="mr-3 h-4 w-4" />
                    Pause Campaign
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm campaign pause.</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to pause this campaign? This will stop sending emails to your leads.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <ButtonWithLoader
                            action={pauseCampaign}
                            params={{
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
