'use server'

import { getUserOrRedirect } from '@/lib/auth'
import { AnonHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import * as z from 'zod'

const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
})

const actionClient = createSafeActionClient()

export const submitAccountDetailsAction = actionClient
    .schema(schema)
    .action(async ({ parsedInput: { firstName, lastName, email } }) => {
        const httpClient = AnonHttpClient()
        const user = await getUserOrRedirect()
        const { id, ...rest } = user
        const body = { ...rest, user_id: id, first_name: firstName, last_name: lastName, email: email }

        try {
            await httpClient.post(`save-instructions/`, body)
        } catch {
            throw new Error('Error submitting account details.')
        }
    })
