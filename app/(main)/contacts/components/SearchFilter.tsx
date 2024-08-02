'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { z } from 'zod'
import { filtersFormSchema } from './Filters'

export default function SearchFilter({
    defaultValue,
    filters,
}: {
    defaultValue: string
    filters: z.infer<typeof filtersFormSchema>
}) {
    const [searchVal, setSearchVal] = useState(defaultValue)

    return (
        <div className="flex w-full gap-3 lg:w-96">
            <Input
                onChange={(val) => setSearchVal(val.target.value)}
                value={searchVal}
                placeholder="Filter by name, job, company, or other field"
                className=""
            />
            <Button
                size="icon"
                className="px-2"
                disabled={searchVal === defaultValue}
                asChild={searchVal !== defaultValue}
            >
                <Link
                    href={{
                        pathname: '/contacts',
                        query: {
                            search: searchVal,
                            ...filters,
                        },
                    }}
                >
                    <Search className="h-4 w-4" />
                </Link>
            </Button>
        </div>
    )
}
