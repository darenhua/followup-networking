'use server'

import { getUserOrRedirect } from '@/lib/auth'
import { AuthenticatedHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
    subject: z.string().min(1),
    body: z.string().min(1),
    to: z.string().email(),
})

const actionClient = createSafeActionClient()

export const sendEmailAction = actionClient
    .schema(schema)
    .action(async ({ parsedInput: { subject, body, to } }) => {
        const httpClient = await AuthenticatedHttpClient()
        const user = await getUserOrRedirect()
        const res = await httpClient.post('/send-individual-emails/', {
            smtpHost: 'smtp.gmail.com',
            smtpPort: 587,
            mailUname: user.email,
            mailPwd: user.app_password,
            fromEmail: user.email,
            mailsubject: subject,
            mailContentHtml: body,
            recepientsMaillist: [to],
        })
        if (res.status === 400) {
            throw new Error('Could not send email, something went wrong')
        }

        revalidatePath(`/campaigns`)
    })
