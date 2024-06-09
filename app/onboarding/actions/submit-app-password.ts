'use server'

import { getUserOrRedirect } from '@/lib/auth'
import { AnonHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import * as z from 'zod'

const action = createSafeActionClient({
    handleReturnedServerError(e) {
        return e.message
    },
})

const schema = z.object({
    appPassword: z.string().min(1).max(50),
})

export const submitAppPassword = async ({ appPassword }: z.infer<typeof schema>) => {
    const httpClient = await AnonHttpClient()
    const user = await getUserOrRedirect()
    const { id, ...rest } = user
    const body = { ...rest, user_id: id, app_password: appPassword }

    try {
        await httpClient.post(`save-instructions/`, body)
    } catch {
        throw new Error('Error submitting app password.')
    }
}

export const submitAppPasswordAction = action(schema, submitAppPassword)
