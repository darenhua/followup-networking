'use server'

import { AuthenticatedHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

const schema = z.object({
    campaign_name: z.string().min(1),
})

const actionClient = createSafeActionClient()

export const updateTemplate = actionClient.schema(schema).action(async ({ parsedInput: {} }) => {
    const httpClient = await AuthenticatedHttpClient()
    // TODO: ROUTE IS: POST /launch_campaign/
    await httpClient.post('')
})
