'use server'

import { AuthenticatedHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

const lead = z.object({
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    company: z.string().min(1),
    type: z.string().min(1),
    title: z.string().min(1),
    university: z.string().min(1),
})

const schema = z.object({
    selected_leads: z.array(lead),
    campaign_name: z.string().min(1),
    user_id: z.number(),
})

const actionClient = createSafeActionClient()

export const updateTemplate = actionClient.schema(schema).action(async ({ parsedInput }) => {
    const httpClient = await AuthenticatedHttpClient()
    // TODO: ROUTE IS: POST /upload_to_campaign/
    try {
        await httpClient.post('upload_to_campaign/', parsedInput)
    } catch (error ) {
        console.error(error)
        throw new Error("Sorry, something went wrong")
    }
})
