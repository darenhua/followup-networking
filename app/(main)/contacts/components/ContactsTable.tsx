'use client'

import { useState } from 'react'
import { z } from 'zod'
import { Contact, columns } from './Columns'
import DataTable from './DataTable'
import Filters, { filtersFormSchema } from './Filters'
import PaginationControls from './PaginationControls'

export default function ContactsTable({
    defaultValues,
    filterOptions,
    search,
    contacts,
    paginationProps,
    campaignNames,
}: {
    defaultValues: z.infer<typeof filtersFormSchema>
    filterOptions: {
        typeOptions: string[]
        companyOptions: string[]
        locationOptions: string[]
        levelOptions: string[]
        universityOptions: string[]
    }
    search: string | null
    contacts: Contact[]
    paginationProps: {
        limit: number
        page: number
        total: number
        from: number
        to: number
    }
    campaignNames: string[]
}) {
    const [rowSelection, setRowSelection] = useState({})

    const selectedData = Object.keys(rowSelection).map((index) => {
        const i = Number(index)
        const lead: Contact = contacts[i]
        return {
            email: lead.email,
            first_name: lead.first_name,
            last_name: lead.last_name,
            company: lead.company,
            type: lead.type,
            title: lead.title,
            university: lead.university,
        }
    })

    return (
        <div className="flex flex-1 flex-col">
            <Filters
                search={search}
                rowSelection={rowSelection}
                defaultValues={defaultValues}
                filterOptions={filterOptions}
                setRowSelection={setRowSelection}
                selectedLeads={selectedData}
                campaignNames={campaignNames}
            />
            <DataTable
                columns={columns}
                data={contacts}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
            />
            <PaginationControls
                limit={paginationProps.limit}
                page={paginationProps.page}
                total={paginationProps.total}
                from={paginationProps.from}
                to={paginationProps.to}
            />
        </div>
    )
}
