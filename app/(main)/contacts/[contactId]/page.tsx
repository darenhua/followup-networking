import Breadcrumbs from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthenticatedHttpClient } from '@/lib/axios'
import Link from 'next/link'
import AddToCampaignButton from './components/AddToCampaignButton'
import SendEmailButton from './components/SendEmailButton'

interface Campaign {
    id: string
    name: string
    count: number
    status: string
}

export default async function Page({ params }: { params: { contactId: number } }) {
    const httpClient = AuthenticatedHttpClient()
    let templatesRes = null
    try {
        const res = await httpClient.get('email-template/')
        templatesRes = res.data['user_emails']
    } catch {
        throw new Error('Something went wrong')
    }

    const res = await httpClient.get('/campaign')
    const campaignNames = res.data['distinct_campaigns']

    const contactRes = await httpClient.get(`get_selected_contacts/?contactIds[]=${params.contactId}`)
    const contact = contactRes.data['contacts'][0]

    const campaignEmails = res.data['campaign_emails'].filter((email: any) => email.email === contact.email)
    const containedCampaigns = campaignEmails.map((email: any) => email.campaign_name)

    const templates = templatesRes.map((template: any, i: number) => ({
        id: `${i + 1}`,
        name: `Template ${i + 1}`,
        subject: template['subject'],
        body: template['email_content1'],
    }))

    const templateOptions = [
        {
            id: 'none',
            name: 'No Template',
            subject: '',
            body: '',
        },
        ...templates,
    ]

    console.log(contact)

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="mt-2 flex flex-col justify-center">
                <Breadcrumbs links={[{ label: 'Contacts', href: '/contacts' }, { label: 'Details' }]} />
                <div className="mt-6 flex flex-1 items-center justify-between">
                    <h1 className="text-lg font-semibold md:text-2xl">Contact Details</h1>
                    <div className="flex gap-3">
                        <SendEmailButton
                            templates={templateOptions}
                            name={`${contact.first_name} ${contact.last_name}`}
                            contactId={params.contactId}
                        />
                        <AddToCampaignButton
                            campaignNames={campaignNames.filter((name: string) => !containedCampaigns.includes(name))}
                            lead={contact}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6 mt-10 flex flex-1 flex-col items-center gap-2">
                {/* <h2 className="text-lg font-semibold">Details</h2> */}
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle className="my-3 text-center text-lg md:text-xl">
                            {contact.first_name} {contact.last_name}
                        </CardTitle>
                        <div className="flex items-center justify-center gap-3">
                            {containedCampaigns.map((name: string, id: number) => {
                                return (
                                    <Link key={id} href={`/campaigns/${name}`}>
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                            {name}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-semibold">Email:</span>
                                <span>{contact.email}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-semibold">Job Title:</span>
                                <span>{contact.title}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-semibold">Company:</span>
                                <span>{contact.company}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-semibold">Type:</span>
                                <span>{contact.type}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-semibold">Location:</span>
                                <span>{contact.location}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-semibold">Level:</span>
                                <span>{contact.level}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-semibold">University:</span>
                                <span>{contact.university}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-semibold">LinkedIn:</span>
                                <Link href={contact.linkedin} target="_blank" className="text-blue-500">
                                    <span>{contact.linkedin}</span>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
