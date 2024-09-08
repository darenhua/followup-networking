'use server'

import { getUserOrRedirect } from '@/lib/auth'
import { AnonHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
    delete_list: z.array(z.string().email()),
    campaign_name: z.string().min(1),
})

const actionClient = createSafeActionClient()

export const removeFromCampaignAction = actionClient
    .schema(schema)
    .action(async ({ parsedInput: { delete_list, campaign_name } }) => {
        const user = await getUserOrRedirect()
        const httpClient = await AnonHttpClient()

        const res = await httpClient.post('/delete_leads/', {
            delete_list,
            campaign_name,
            user_id: user.user,
        })

        if (res.status === 400) {
            throw new Error('Invalid campaign')
        }

        revalidatePath(`/campaigns`)
        revalidatePath(`/campaigns/${campaign_name}`)
    })
