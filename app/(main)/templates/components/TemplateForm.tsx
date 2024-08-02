'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FollowUpTemplate } from './TemplateSelect'

const formSchema = z.object({
    subject: z.string().min(1, { message: 'Please enter a subject' }),
    initialBody: z.string().min(1, { message: 'Please enter your initial cold email' }),
    firstFollowUp: z.string().min(1, { message: 'Please enter your first follow up email' }),
    secondFollowUp: z.string().min(1, { message: 'Please enter your second follow up email' }),
    fontSize: z.string().min(1),
    fontFamily: z.string().min(1),
})

export default function TemplateForm({
    selectedTemplate,
    campaignId,
}: {
    selectedTemplate: FollowUpTemplate
    campaignId: number | null
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: '',
            initialBody: '',
            firstFollowUp: '',
            secondFollowUp: '',
            fontFamily: 'Arial',
            fontSize: '14px',
        },
    })

    useEffect(() => {
        form.setValue('subject', selectedTemplate.subject)
        form.setValue('initialBody', selectedTemplate.initialBody)
        form.setValue('firstFollowUp', selectedTemplate.firstFollowUp)
        form.setValue('secondFollowUp', selectedTemplate.secondFollowUp)
        form.setValue('fontFamily', selectedTemplate.fontFamily)
        form.setValue('fontSize', selectedTemplate.fontSize)
    }, [form, JSON.stringify(selectedTemplate)])

    const disabled = campaignId === null

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Subject</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="Fellow Cornellian Seeking Advice for Investment Banking at {{companyName}}"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="initialBody"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Initial Cold Email</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={disabled}
                                    placeholder="Hello {{firstName}}..."
                                    className="resize-none"
                                    rows={10}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstFollowUp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Follow-Up</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={disabled}
                                    placeholder="Hey {{firstName}}!"
                                    className="resize-none"
                                    rows={10}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="secondFollowUp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Second Follow-Up</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={disabled}
                                    placeholder="Just following up on my previous message..."
                                    className="resize-none"
                                    rows={10}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
