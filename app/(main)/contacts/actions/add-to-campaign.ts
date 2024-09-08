'use server'

import { getUserOrRedirect } from '@/lib/auth'
import { AnonHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const lead = z.object({
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    type: z.string(),
    title: z.string(),
    university: z.string(),
})

const schema = z.object({
    selected_leads: z.array(lead),
    campaign_name: z.string().min(1),
})

const actionClient = createSafeActionClient()

export const addToCampaignAction = actionClient
    .schema(schema)
    .action(async ({ parsedInput: { selected_leads, campaign_name } }) => {
        const user = await getUserOrRedirect()
        const httpClient = await AnonHttpClient()

        const res = await httpClient.post('/upload_to_campaign/', {
            selected_leads,
            campaign_name,
            user_id: user.user,
        })

        if (res.status === 400) {
            throw new Error('Sorry, something went wrong.')
        }

        revalidatePath(`/contacts`)
        // revalidatePath(`/contacts/`)
    })
