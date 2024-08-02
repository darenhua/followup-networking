'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectGroup } from '@radix-ui/react-select'
import { Filter, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import SearchFilter from './SearchFilter'

export const filtersFormSchema = z.object({
    typeFilter: z.string(),
    companyFilter: z.string(),
    locationFilter: z.string(),
    levelFilter: z.string(),
    universityFilter: z.string(),
})

export default function Filters({
    defaultValues,
    filterOptions,
    search,
    rowSelection,
    setRowSelection,
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
    rowSelection: any
    setRowSelection: any
    campaignNames: string[]
}) {
    const form = useForm<z.infer<typeof filtersFormSchema>>({
        resolver: zodResolver(filtersFormSchema),
        defaultValues: defaultValues,
    })

    const [campaignName, setCampaignName] = useState<string | null>(null)

    useEffect(() => {
        form.reset(defaultValues)
    }, [defaultValues, form])

    function isEmpty(filters: z.infer<typeof filtersFormSchema>): boolean {
        const emptyFields = {
            typeFilter: '',
            companyFilter: '',
            locationFilter: '',
            levelFilter: '',
            universityFilter: '',
        }
        return JSON.stringify(emptyFields) === JSON.stringify(filters)
    }

    const activeFiltersCount = Object.values(form.getValues()).reduce((acc, curr) => {
        if (curr === '') return acc
        return acc + 1
    }, 0)
    const selectedRowsCount = Object.keys(rowSelection).length

    const { typeOptions, companyOptions, locationOptions, levelOptions, universityOptions } = filterOptions

    return (
        <div className="flex flex-col-reverse items-center justify-between gap-3 py-4 lg:flex-row">
            <SearchFilter defaultValue={search ?? ''} filters={form.getValues()} />

            <div className="flex w-full items-center gap-3 lg:w-fit">
                <div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button disabled={selectedRowsCount === 0}>
                                <Plus className="mr-3 h-4 w-4" />
                                Add ({selectedRowsCount}) to Campaign
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Adding {selectedRowsCount} contacts to campaign.</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Please select which campaign you are adding these contacts to.
                                </AlertDialogDescription>
                                <div className="my-3">
                                    <Select
                                        onValueChange={(value) => {
                                            setCampaignName(value)
                                        }}
                                    >
                                        <SelectTrigger className="my-3 w-full">
                                            <SelectValue placeholder="Select your campaign" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {campaignNames.map((name: string) => {
                                                return (
                                                    <SelectItem key={name} value={name}>
                                                        {name}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    disabled={campaignName === null}
                                    onClick={async () => {
                                        setRowSelection({})
                                    }}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
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
                                                pathname: '/contacts',
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
                                Filter contacts on Follow Up to find the people you want to reach out to!
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
                                        name="levelFilter"
                                        label="Level"
                                        placeholder="Select a level..."
                                        options={levelOptions.filter((x) => x.length > 0)}
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
                                                pathname: '/contacts',
                                                query: {
                                                    search,
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
