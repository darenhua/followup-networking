'use server'

import { getUserOrRedirect } from '@/lib/auth'
import { AuthenticatedHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

const template = z.object({
    subject: z.string().min(1, { message: 'Please enter a subject' }),
    initialBody: z.string().min(1, { message: 'Please enter your initial cold email' }),
    firstFollowUp: z.string().min(1, { message: 'Please enter your first follow up email' }),
    secondFollowUp: z.string().min(1, { message: 'Please enter your second follow up email' }),
    fontSize: z.string().min(1),
    fontFamily: z.string().min(1),
})

const schema = z.object({
    template: template,
    campaignName: z.string(),
})

const actionClient = createSafeActionClient()

export const updateTemplate = actionClient
    .schema(schema)
    .action(async ({ parsedInput: { template, campaignName } }) => {
        const httpClient = await AuthenticatedHttpClient()

        const user = await getUserOrRedirect()
        const summaryRes = await httpClient.post('get_campaign_summary/', { campaign_name: campaignName })
        const campaignId = summaryRes.data['campaign_id']

        const updatedSequences = []
        updatedSequences.push({
            type: 'email',
            delay: 1,
            variants: [
                {
                    subject: template.subject,
                    body: `<div>${template.initialBody}</div>`,
                },
            ],
        })
        updatedSequences.push({
            type: 'email',
            delay: 2,
            variants: [
                {
                    subject: template.subject,
                    body: `<div>${template.firstFollowUp}</div>`,
                },
            ],
        })
        updatedSequences.push({
            type: 'email',
            delay: 3,
            variants: [
                {
                    subject: template.subject,
                    body: `<div>${template.secondFollowUp}</div>`,
                },
            ],
        })

        const followUpEmail = process.env.INSTANTLY_API_EMAIL
        const followUpPassword = process.env.INSTANTLY_API_PASSWORD

        const requestBody = {
            user_id: user.user,
            email: followUpEmail,
            password: followUpPassword,
            campaign_name: campaignName,
            sequence_data: {
                sequences: [
                    {
                        steps: updatedSequences,
                    },
                ],
                campaignID: campaignId,
                orgID: '174fc505-4a13-425c-9579-bf46339fbf98',
            },
        }

        try {
            await httpClient.post('update_sequences/', requestBody)
        } catch {
            throw new Error('Sorry, something went wrong')
        }
    })
