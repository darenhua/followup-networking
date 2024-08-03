import { AuthenticatedHttpClient } from '@/lib/axios'
import TemplateSelect from './components/TemplateSelect'

export default async function Page() {
    const httpClient = AuthenticatedHttpClient()
    let templates = null
    try {
        const res = await httpClient.get('email-template/')
        templates = res.data
    } catch {
        throw new Error('Something went wrong')
    }
    const res = await httpClient.get('get_campaign_names/')
    const campaignNames = res.data.campaigns

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Email Templates</h1>
            </div>
            <TemplateSelect campaignNames={campaignNames} templates={templates} />
        </main>
    )
}
