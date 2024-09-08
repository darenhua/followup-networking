'use server'

import { getUserOrRedirect } from '@/lib/auth'
import { AnonHttpClient } from '@/lib/axios'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
    subject: z.string().min(1),
    body: z.string().min(1),
    to: z.string().email(),
})

const actionClient = createSafeActionClient()

export const sendEmailAction = actionClient.schema(schema).action(async ({ parsedInput: { subject, body, to } }) => {
    const httpClient = await AnonHttpClient()
    const user = await getUserOrRedirect()
    const postBody = {
        smtpHost: 'smtp.gmail.com',
        smtpPort: 465,
        mailUname: user.email,
        mailPwd: user.app_password,
        fromEmail: user.email,
        mailSubject: subject,
        mailContentHtml: body,
        recepientsMailList: [to],
    }

    const res = await httpClient.post('/send-individual-emails/', postBody)
    if (res.status === 400) {
        throw new Error('Could not send email, something went wrong')
    }

    revalidatePath(`/campaigns`)
})
