'use client'

import { SubmitFormButton } from '@/components/SubmitFormButton'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { submitAppPasswordAction } from '../../actions/submit-app-password'

const formSchema = z.object({
    appPassword: z.string().min(1).max(50),
})

export default function SetupAppPassword({ next, back }: { next: () => void; back: () => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            appPassword: '',
        },
    })

    const submitAppPassword = useAction(submitAppPasswordAction, {
        onSuccess: () => {
            next()
        },
        onError: (error) => {
            console.error(error)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        submitAppPassword.execute(values)
    }

    return (
        <div className="flex h-full w-full">
            <div className="flex flex-1 items-center justify-center">
                <Image src="/test.gif" alt="tutorial for setting up app password" width={200} height={100} />
            </div>
            <div className="mr-12 mt-6 flex h-full w-96 flex-col items-center rounded-lg border px-6 pt-20 shadow-sm">
                <div className="animate-slide-in opacity-0">
                    <div className="mb-8 max-w-72">
                        <h5 className="text-muted-foreground">Step 2</h5>
                        <h3 className="text-lg font-semibold md:text-2xl">Create your Google App Password</h3>
                    </div>
                    <ol className="max-w-72">
                        <li className="list-decimal">
                            Go to your Google Account's{' '}
                            <a
                                href="https://myaccount.google.com/security"
                                className="text-blue-500 underline"
                                target="_blank"
                            >
                                Security Settings
                            </a>
                            .
                        </li>
                        <li className="list-decimal">
                            Enable{' '}
                            <a
                                className="text-blue-500 underline"
                                href="https://myaccount.google.com/signinoptions/two-step-verification"
                                target="_blank"
                            >
                                2-step verification
                            </a>
                            .
                        </li>
                        <li className="list-decimal">
                            Go to your Google{' '}
                            <a
                                className="text-blue-500 underline"
                                href="https://myaccount.google.com/apppasswords"
                                target="_blank"
                            >
                                App Password Page
                            </a>
                            .
                        </li>
                        <li className="list-decimal">Set App name as "Follow-Up Networking".</li>
                        <li className="list-decimal">Press "Create".</li>
                        <li className="list-decimal">Copy your app password and paste it in the textbox below.</li>
                    </ol>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="appPassword"
                                render={({ field }) => (
                                    <FormItem className="mt-6">
                                        <FormControl>
                                            <Input
                                                placeholder="zxAW asdX asdEx AKew
"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="ml-auto mt-20 flex justify-end gap-3">
                                <Button variant="secondary" type="button" onClick={back} className="">
                                    Back
                                </Button>
                                <SubmitFormButton
                                    requireValidForm
                                    isPendingOverride={submitAppPassword.status === 'executing'}
                                >
                                    <ArrowRightIcon className="mr-3 h-4 w-4" />
                                    Continue
                                </SubmitFormButton>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
