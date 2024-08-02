'use client'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectGroup } from '@radix-ui/react-select'
import { Filter } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'

export const filtersFormSchema = z.object({
    typeFilter: z.string(),
    companyFilter: z.string(),
    locationFilter: z.string(),
    universityFilter: z.string(),
})

export default function Filters({
    defaultValues,
    filterOptions,
    search,
    campaignId,
}: {
    defaultValues: z.infer<typeof filtersFormSchema>
    filterOptions: {
        typeOptions: string[]
        companyOptions: string[]
        locationOptions: string[]
        universityOptions: string[]
    }
    search: string | null
    campaignId: string
}) {
    const form = useForm<z.infer<typeof filtersFormSchema>>({
        resolver: zodResolver(filtersFormSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        form.reset(defaultValues)
    }, [defaultValues, form])

    function isEmpty(filters: z.infer<typeof filtersFormSchema>): boolean {
        const emptyFields = {
            typeFilter: '',
            companyFilter: '',
            locationFilter: '',
            universityFilter: '',
        }
        return JSON.stringify(emptyFields) === JSON.stringify(filters)
    }

    const activeFiltersCount = Object.values(form.getValues()).reduce((acc, curr) => {
        if (curr === '') return acc
        return acc + 1
    }, 0)

    const { typeOptions, companyOptions, locationOptions, universityOptions } = filterOptions

    return (
        <div className="flex flex-col-reverse items-center justify-between gap-3 py-4 lg:flex-row">
            {/* <SearchFilter campaignId={campaignId} defaultValue={search ?? ''} filters={form.getValues()} /> */}

            <div className="flex w-full items-center gap-3 lg:w-fit">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            Active Filters ({activeFiltersCount})
                            <Filter className="ml-3 h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>
                                <div className="flex items-center gap-3">
                                    <h4>Filters</h4>
                                    {!isEmpty(form.getValues()) && (
                                        <Link
                                            href={{
                                                pathname: `/campaigns/${campaignId}`,
                                                query: {},
                                            }}
                                        >
                                            <Button
                                                className="text-red-600"
                                                type="button"
                                                variant={'link'}
                                                onClick={() => {
                                                    form.reset()
                                                }}
                                            >
                                                Clear Fields
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </SheetTitle>
                            <SheetDescription>
                                Filter campaign contacts on Follow Up to find the people you want to reach out to!
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 grid gap-4">
                            <Form {...form}>
                                <form className="space-y-6">
                                    <SelectFormField
                                        name="typeFilter"
                                        label="Type"
                                        placeholder="Select a type..."
                                        options={typeOptions.filter((x) => x.length > 0)}
                                    />
                                    <SelectFormField
                                        name="companyFilter"
                                        label="Company"
                                        placeholder="Select a company..."
                                        options={companyOptions.filter((x) => x.length > 0)}
                                    />
                                    <SelectFormField
                                        name="locationFilter"
                                        label="Location"
                                        placeholder="Select a location..."
                                        options={locationOptions.filter((x) => x.length > 0)}
                                    />
                                    <SelectFormField
                                        name="universityFilter"
                                        label="University"
                                        placeholder="Select a university..."
                                        options={universityOptions.filter((x) => x.length > 0)}
                                    />
                                    <div className="pt-3">
                                        <Link
                                            href={{
                                                pathname: `/campaigns/${campaignId}`,
                                                query: {
                                                    // search,
                                                    ...mapNonEmptyFields(form.getValues()),
                                                },
                                            }}
                                        >
                                            <Button>Apply filters</Button>
                                        </Link>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

function SelectFormField({
    name,
    label,
    placeholder,
    options,
}: {
    name: string
    label: string
    placeholder: string
    options: string[]
}) {
    const { control } = useFormContext()
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}{' '}
                        {field.value !== '' && (
                            <Button
                                onClick={() => {
                                    field.onChange('')
                                }}
                                type="button"
                                size={'sm'}
                                variant="link"
                                className="text-red-600"
                            >
                                Clear
                            </Button>
                        )}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="my-3 w-full">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup className="overflow-y-scroll">
                                {options.map((name: string) => {
                                    return (
                                        <SelectItem key={name} value={name}>
                                            {name}
                                        </SelectItem>
                                    )
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

function mapNonEmptyFields(fields: z.infer<typeof filtersFormSchema>): Partial<z.infer<typeof filtersFormSchema>> {
    return (
        Object.keys(fields)
            // @ts-ignore
            .filter((key) => fields[key] !== '')
            .reduce((obj, key) => {
                // @ts-ignore
                obj[key] = fields[key]
                return obj
            }, {})
    )
}
