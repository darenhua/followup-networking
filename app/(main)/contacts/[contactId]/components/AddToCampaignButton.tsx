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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { addToCampaignAction } from '../../actions/add-to-campaign'

export default function AddToCampaignButton({ lead, campaignNames }: { lead: any; campaignNames: string[] }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [campaignName, setCampaignName] = useState<null | string>(null)

    const addToCampaign = useAction(addToCampaignAction, {
        onSuccess: () => {
            toast.success(`Add to campaign successful!`)
            setIsOpen(false)
            router.refresh()
        },
        onError: (e) => {
            console.log(e)
            toast.error(`Sorry, something went wrong.`)
        },
    })

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button>
                    <Plus className="mr-3 h-4 w-4" />
                    Add to Campaign
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Adding to campaign.</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please select which campaign you are {lead.email} to.
                    </AlertDialogDescription>
                    <div className="my-3">
                        <Select
                            onValueChange={(value) => {
                                setCampaignName(value)
                            }}
                        >
                            <SelectTrigger className="my-3 w-full">
                                <SelectValue placeholder="Select your campaign" />
                            </SelectTrigger>
                            <SelectContent>
                                {campaignNames.map((name: string) => {
                                    return (
                                        <SelectItem key={name} value={name}>
                                            {name}
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <ButtonWithLoader
                            disabled={campaignName === null}
                            action={addToCampaign}
                            params={{
                                selected_leads: [lead],
                                campaign_name: campaignName!,
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
