'use server'

import { getUserOrRedirect } from '@/lib/auth'
import { AnonHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import * as z from 'zod'

const schema = z.object({
    appPassword: z.string().min(1).max(50),
})

const actionClient = createSafeActionClient()

export const submitAppPasswordAction = actionClient.schema(schema).action(async ({ parsedInput: { appPassword } }) => {
    const httpClient = await AnonHttpClient()
    const user = await getUserOrRedirect()
    const { id, ...rest } = user
    const body = { ...rest, user_id: id, app_password: appPassword }

    try {
        await httpClient.post(`save-instructions/`, body)
    } catch {
        throw new Error('Error submitting app password.')
    }
})
