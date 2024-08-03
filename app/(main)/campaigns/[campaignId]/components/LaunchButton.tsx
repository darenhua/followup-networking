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
import { Rocket } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'
import { launchCampaignAction } from '../actions/launch-campaign'

export default function LaunchButton({ campaignName }: { campaignName: string }) {
    const [open, setOpen] = useState(false)

    const launchCampaign = useAction(launchCampaignAction, {
        onSuccess: () => {
            setOpen(false)
            toast.success(`Campaign ${campaignName} launched!`)
        },
        onError: () => {
            toast.error('Sorry, something went wrong.')
        },
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                    <Rocket className="mr-3 h-4 w-4" />
                    Launch Campaign
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm campaign launch.</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to launch this campaign? This will begin sending emails to your leads.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <ButtonWithLoader
                            action={launchCampaign}
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
