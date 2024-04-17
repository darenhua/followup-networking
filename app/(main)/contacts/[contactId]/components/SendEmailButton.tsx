"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import NewEmailForm from "./NewEmailForm";
import { useState } from "react";

const templates = [
    {
        id: "none",
        name: "default",
        subject: "",
        body: "",
    },
    {
        id: "1",
        name: "Template 1",
        subject: "Subject 1",
        body: `Hello Joshua,

        My name is Peter, and I’m a Junior at Cornell studying Data Science. I developed a strong interest in investment banking, and I’m committed to leveraging my initiative in a career as an investment banker at {{companyName}}.

        From a fellow Cornellian, I was hoping to get 20-25 minutes to learn more about {{companyName}} and your personal journey to banking. Every minute of your time is appreciated, so if you’re open to it, please let me know a couple of times that work best for you, and I’ll do my best to work around it.

        Best regards,
        Peter`,
    },
    {
        id: "2",
        name: "Template 2",
        subject: "Subject 2",
        body: `Hello Joshua,

        I hope all is well. I just wanted to reach out again since my email probably got lost in your inbox.

        If you have a couple of minutes in the upcoming weeks, I would love to connect and ask you for some advice. There is no pressure at all, if not, but I would very much appreciate it.

        I appreciate your consideration in advance.

        Best regards,
        Peter`,
    },
];

export default function SendEmailButton({
    contactId,
    name,
}: {
    contactId: string;
    name: string;
}) {
    const [selectedTemplateId, setSelectedTemplateId] =
        useState<string>("none");
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);
    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

    if (!selectedTemplate) {
        throw new Error("hi");
    }

    const defaultValues = {
        subject: selectedTemplate.subject,
        body: selectedTemplate.body,
    };

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
                        Send an email to {name}. Use one of your pre-made
                        templates or write a new email from scratch.
                    </SheetDescription>
                    <div className="pt-3">
                        <Select
                            onValueChange={(value) =>
                                setSelectedTemplateId(value)
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select your template" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="none">
                                        No Template
                                    </SelectItem>
                                    <SelectItem value="1">
                                        Template 1
                                    </SelectItem>
                                    <SelectItem value="2">
                                        Template 2
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <NewEmailForm
                        defaultValues={defaultValues}
                        closeSheet={() => setSheetOpen(false)}
                        name={name}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}
