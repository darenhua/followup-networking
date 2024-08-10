import { SubmitFormButton } from '@/components/SubmitFormButton'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { sendEmailAction } from '../actions/send-email'

const formSchema = z.object({
    subject: z.string().min(1).max(50),
    body: z.string().min(1),
})

export default function NewEmailForm({
    defaultValues,
    name,
    closeSheet,
}: {
    defaultValues: z.infer<typeof formSchema>
    name: string
    closeSheet: () => void
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: '',
            body: '',
        },
    })

    useEffect(() => {
        form.setValue('subject', defaultValues.subject)
        form.setValue('body', defaultValues.body)
    }, [form, JSON.stringify(defaultValues)])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.success('Email has been sent.')
        const res = await sendEmailAction({ subject: values.subject, body: values.body, to: 'dhua@hamilton.edu' })
        if (res?.serverError || res?.validationErrors) {
            toast.error("Sorry, we couldn't send your email. Please try again.")
        }
        closeSheet()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input placeholder="Following up..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Body</FormLabel>
                            <FormControl>
                                <Textarea rows={10} placeholder={`Dear ${name},`} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitFormButton className="mr-auto mt-12">
                    <Send className="mr-3 h-4 w-4" />
                    Submit
                </SubmitFormButton>
            </form>
        </Form>
    )
}
