import { AuthenticatedHttpClient } from '@/lib/axios'

interface UserEmail {
    id: number
    subject: string
    email_content1: string
    email_content2: string
    email_content3: string
    font_family: string
    user: number
    campaign: number
}

interface CampaignName {
    id: number
    name: string
    user: number
}

interface Template {
    user_emails: UserEmail[]
    campaign_names: CampaignName[]
}

export default async function Page() {
    const httpClient = AuthenticatedHttpClient()
    let template: Template | null = null
    try {
        const res = await httpClient.get('email-template/')
        template = res.data
    } catch {
        throw new Error('Something went wrong')
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Templates</h1>
            </div>
            <div>
                <h3>Initial Cold Email</h3>
                <p></p>
            </div>
        </main>
    )
}
