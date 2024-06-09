'use client'

import { SubmitFormButton } from '@/components/SubmitFormButton'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { submitAccountDetailsAction } from '../../actions/submit-account-details'

const formSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
})

export default function SetupAccount({ next, back }: { next: () => void; back: () => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
    })

    const submitAccountDetails = useAction(submitAccountDetailsAction, {
        onSuccess: () => {
            next()
        },
        onError: (error) => {
            console.error(error)
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        submitAccountDetails.execute(values)
    }

    return (
        <div className="mx-auto mt-6 flex h-[95%] w-96 flex-col items-center rounded-lg border px-8 py-20 shadow-sm">
            <div className="animate-slide-in opacity-0">
                <div className="mb-8 max-w-72">
                    <h5 className="text-muted-foreground">Step 3</h5>
                    <h3 className="text-lg font-semibold md:text-2xl">Finish account setup</h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                        One last step! Please fill out the form below to start using Follow Up.
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="jdoe@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />

                                        <FormDescription>
                                            This address will be used to send emails to your leads!
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="ml-auto mt-20 flex justify-end gap-3">
                            <Button onClick={back} variant="secondary" type="button" className="">
                                Back
                            </Button>
                            <SubmitFormButton requireValidForm className="bg-indigo-600 hover:bg-indigo-700">
                                <ArrowRightIcon className="mr-3 h-4 w-4" />
                                Finish
                            </SubmitFormButton>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
