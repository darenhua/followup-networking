import Breadcrumbs from "@/components/Breadcrumbs";
import { Contact } from "../components/Columns";
import { Button } from "@/components/ui/button";
import SendEmailButton from "./components/SendEmailButton";

const contacts: Contact[] = [
    {
        id: "1",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "2",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
];

export default async function Page({
    params,
}: {
    params: { contactId: string };
}) {
    const contactId = params.contactId;
    const contact = contacts[Number(contactId) - 1];

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="mt-2 flex flex-col justify-center">
                <Breadcrumbs
                    links={[
                        { label: "Contacts", href: "/contacts" },
                        { label: contact.email },
                    ]}
                />
                <div className="mt-6 flex flex-1 items-center justify-between">
                    <h1 className="text-lg font-semibold capitalize md:text-2xl">
                        {contact.email} TODO
                    </h1>
                    <div className="flex gap-3">
                        <SendEmailButton
                            name={"Joshua"}
                            contactId={contactId}
                        />
                        <Button>Add to Campaign</Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
                {/* <h2 className="text-lg font-semibold">Details</h2> */}
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">Email</span>
                    <span>{contact.email}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">Amount</span>
                    <span>${contact.amount}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">Status</span>
                    <span>{contact.status}</span>
                </div>
            </div>
        </main>
    );
}
