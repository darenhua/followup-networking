import { AuthenticatedHttpClient } from '@/lib/axios'
import { Contact } from './components/Columns'
import ContactsTable from './components/ContactsTable'

export default async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    // Pagination logic
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

    for (const searchParam of Object.values(searchParams)) {
        if (Array.isArray(searchParam)) {
            throw new Error('Sorry, something went wrong!')
        }
    }

    // Filtering options
    const defaultFilters = {
        typeFilter: (searchParams.typeFilter ?? '') as string,
        companyFilter: (searchParams.companyFilter ?? '') as string,
        locationFilter: (searchParams.locationFilter ?? '') as string,
        levelFilter: (searchParams.levelFilter ?? '') as string,
        universityFilter: (searchParams.universityFilter ?? '') as string,
    }
    const search = (searchParams.search ?? '') as string

    const httpClient = AuthenticatedHttpClient()

    const campaignRes = await httpClient.get('/campaign')
    const campaign = campaignRes.data['campaign_emails']
    const campaignEmails = campaign.map((c: any) => c.email)

    const backendSearchParams = new URLSearchParams(defaultFilters)

    const contactsRes = await httpClient.get(`contact-list/?q=${search}&${backendSearchParams.toString()}&page=${page}`)
    const contacts: Contact[] = contactsRes.data.contacts

    const filteredContacts = contacts.filter((contact) => !campaignEmails.includes(contact.email))

    const campaignNames = contactsRes.data.campaign_names

    const filterOptions = {
        typeOptions: contactsRes.data.distinct_types,
        companyOptions: contactsRes.data.distinct_companies,
        locationOptions: contactsRes.data.distinct_locations,
        levelOptions: contactsRes.data.distinct_levels,
        universityOptions: contactsRes.data.distinct_university,
    }

    const totalContactsRes = await httpClient.get(`/contacts/total/`)
    const totalContacts = totalContactsRes.data['total_contacts']

    const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : contacts.length
    const { from, to } = { from: (page - 1) * limit, to: page * limit }

    const paginationProps = {
        limit,
        page,
        total: totalContacts,
        from,
        to,
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Contacts</h1>
            </div>
            <ContactsTable
                defaultValues={defaultFilters}
                filterOptions={filterOptions}
                search={search}
                contacts={filteredContacts}
                paginationProps={paginationProps}
                campaignNames={campaignNames}
            />
        </main>
    )
}
