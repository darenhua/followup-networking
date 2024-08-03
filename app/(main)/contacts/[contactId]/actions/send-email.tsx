// 'use server'

// import { AuthenticatedHttpClient } from '@/lib/axios'
// import { createSafeActionClient } from 'next-safe-action'
// import { revalidatePath } from 'next/cache'
// import { z } from 'zod'

// const schema = z.object({
//     app_password: z.string().min(1),
//     from: z.string().email(),
//     subject: z.string().min(1),
//     body: z.string().min(1),
//     to: z.string().email(),
// })

// const actionClient = createSafeActionClient()

// export const launchCampaignAction = actionClient
//     .schema(schema)
//     .action(async ({ parsedInput: { app_password, from, subject, body, to } }) => {
//         const httpClient = await AuthenticatedHttpClient()
//         const res = await httpClient.post('/launch_campaign/', {
//             campaign_name,
//         })
//         if (res.status === 400) {
//             throw new Error('Invalid campaign')
//         }

//         revalidatePath(`/campaigns`)
//         revalidatePath(`/campaigns/${campaign_name}`)
//     })
