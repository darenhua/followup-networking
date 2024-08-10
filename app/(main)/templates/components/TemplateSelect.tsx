'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import TemplateForm from './TemplateForm'

interface UserEmail {
    id: number
    subject: string
    email_content1: string
    email_content2: string
    email_content3: string
    font_family: string
    font_size: string
    user: number
    campaign: number
}

interface CampaignName {
    id: number
    name: string
    user: number
}

interface Templates {
    user_emails: UserEmail[]
    campaign_names: CampaignName[]
}

export interface FollowUpTemplate {
    subject: string
    initialBody: string
    firstFollowUp: string
    secondFollowUp: string
    fontFamily: string
    fontSize: string
}

export default function TemplateSelect({
    campaignNames,
    templates,
}: {
    campaignNames: string[]
    templates: Templates
}) {
    const getTemplateFromCampaignName = (campaignName: string): UserEmail | null => {
        const campaignId = templates.campaign_names.find((campaign) => campaign.name === campaignName)?.id

        if (!campaignId) {
            return null
        }

        const campaign = templates.user_emails.find((campaign) => campaign.campaign === campaignId)

        if (!campaign) {
            return null
        }

        return campaign
    }

    const getSelectedTemplateOrDefault = (campaign: UserEmail | null) => {
        if (!campaign) {
            return {
                subject: '',
                initialBody: '',
                firstFollowUp: '',
                secondFollowUp: '',
                fontFamily: 'Arial',
                fontSize: '14px',
            }
        }
        return {
            subject: campaign.subject,
            initialBody: campaign.email_content1,
            firstFollowUp: campaign.email_content2,
            secondFollowUp: campaign.email_content3,
            fontFamily: campaign.font_family,
            fontSize: campaign.font_size,
        }
    }

    const [selectedTemplate, setSelectedTemplate] = useState<FollowUpTemplate>(() => {
        const campaign = getTemplateFromCampaignName(campaignNames[0])
        return getSelectedTemplateOrDefault(campaign)
    })
    const [campaignId, setCampaignId] = useState<number | null>(() => {
        const campaign = getTemplateFromCampaignName(campaignNames[0])
        return campaign?.campaign ?? null
    })

    const campaignName: string | null =
        templates.campaign_names.find((campaign) => campaign.id === campaignId)?.name ?? null

    return (
        <>
            <div>
                <Label>Selected Campaign</Label>
                <Select
                    defaultValue={campaignNames[0]}
                    onValueChange={(value) => {
                        const campaign = getTemplateFromCampaignName(value)
                        const newTemplate = getSelectedTemplateOrDefault(campaign)
                        const campaignId = campaign?.campaign ?? null
                        setSelectedTemplate(newTemplate)
                        setCampaignId(campaignId)
                    }}
                >
                    <SelectTrigger className="mt-3 w-[300px]">
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
            <div className="max-w-2xl">
                <TemplateForm selectedTemplate={selectedTemplate} campaignName={campaignName} />
            </div>
        </>
    )
}
