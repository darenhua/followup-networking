'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail } from 'lucide-react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'
import NewEmailForm from './NewEmailForm'

interface Template {
    id: string
    name: string
    subject: string
    body: string
}

export default function SendEmailButton({
    contactId,
    name,
    templates,
}: {
    contactId: number
    name: string
    templates: Template[]
}) {
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('none')
    const [sheetOpen, setSheetOpen] = useState<boolean>(false)
    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId)

    if (!selectedTemplate) {
        throw new Error('Sorry, something went wrong!')
    }

    const defaultValues = {
        subject: selectedTemplate.subject,
        body: selectedTemplate.body,
    }

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Mail className="mr-3 h-4 w-4" /> Send Email
                </Button>
            </SheetTrigger>
            <SheetContent className="max-w-[500px] sm:max-w-[640px]">
                <SheetHeader>
                    <SheetTitle>New email to {name}</SheetTitle>
                    <SheetDescription>
                        Send an email to {name}. Use one of your pre-made templates or write a new email from scratch.
                    </SheetDescription>
                    <div className="pt-3">
                        <Select onValueChange={(value) => setSelectedTemplateId(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select your template" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {templates.map((template) => (
                                        <SelectItem value={template.id} key={template.id}>
                                            {template.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <NewEmailForm defaultValues={defaultValues} closeSheet={() => setSheetOpen(false)} name={name} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
