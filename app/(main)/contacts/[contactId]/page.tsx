import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthenticatedHttpClient } from '@/lib/axios'
import Link from 'next/link'
import { Contact } from '../components/Columns'
import SendEmailButton from './components/SendEmailButton'

const contacts: Contact[] = [
    {
        id: 1,
        first_name: 'Daren',
        last_name: 'Hua',
        email: 'dhua@hamilton.edu',
        title: 'Software Engineer Intern',
        company: 'Gleam',
        type: 'Test',
        location: 'NYC',
        level: 'Test Level',
        university: 'Hamilton College',
        linkedin: 'https://www.asdasd.com',
    },
]

export default async function Page({ params }: { params: { contactId: string } }) {
    const contactId = params.contactId
    const contact = contacts[Number(contactId) - 1]

    const httpClient = AuthenticatedHttpClient()
    let templatesRes = null
    try {
        const res = await httpClient.get('email-template/')
        templatesRes = res.data['user_emails']
    } catch {
        throw new Error('Something went wrong')
    }
    console.log(templatesRes)

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
                            contactId={contactId}
                        />
                        <Button>Add to Campaign</Button>
                    </div>
                </div>
            </div>

            <div className="mt-10 flex flex-1 flex-col items-center gap-2">
                {/* <h2 className="text-lg font-semibold">Details</h2> */}
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle className="my-3 text-center text-lg md:text-xl">
                            {contact.first_name} {contact.last_name}
                        </CardTitle>
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
