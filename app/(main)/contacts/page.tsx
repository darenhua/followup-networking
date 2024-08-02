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
    const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 50
    const { from, to } = { from: (page - 1) * limit, to: page * limit }

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

    const backendSearchParams = new URLSearchParams(defaultFilters)

    const contactsRes = await httpClient.get(`contact-list/?q=${search}&${backendSearchParams.toString()}&page=${page}`)
    const contacts: Contact[] = contactsRes.data.contacts

    const campaignNames = contactsRes.data.campaign_names

    const filterOptions = {
        typeOptions: contactsRes.data.distinct_types,
        companyOptions: contactsRes.data.distinct_companies,
        locationOptions: contactsRes.data.distinct_locations,
        levelOptions: contactsRes.data.distinct_levels,
        universityOptions: contactsRes.data.distinct_university,
    }

    const paginationProps = {
        limit,
        page,
        total: contacts.length,
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
                contacts={contacts}
                paginationProps={paginationProps}
                campaignNames={campaignNames}
            />
        </main>
    )
}
