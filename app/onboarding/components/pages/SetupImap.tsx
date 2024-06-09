import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function SetupImap({ next, back }: { next: () => void; back: () => void }) {
    return (
        <div className="flex h-full w-full">
            <div className="flex flex-1 items-center justify-center">
                <Image src="/test.gif" alt="tutorial for setting up IMAP" width={200} height={100} />
            </div>
            <div className="mr-12 mt-6 flex h-full w-96 flex-col items-center rounded-lg border px-6 py-20 shadow-sm">
                <div className="animate-slide-in opacity-0">
                    <div className="mb-8 max-w-72">
                        <h5 className="text-muted-foreground">Step 1</h5>
                        <h3 className="text-lg font-semibold md:text-2xl">Set up IMAP Access</h3>
                    </div>
                    <ol className="max-w-72">
                        <li className="list-decimal">On your computer, open Gmail.</li>
                        <li className="list-decimal">Click the gear icon in the top right corner.</li>
                        <li className="list-decimal">Click "All Settings".</li>
                        <li className="list-decimal">Click the Forwarding and POP/IMAP tab.</li>
                        <li className="list-decimal">In the "IMAP Access" section, select "Enable IMAP".</li>
                        <li className="list-decimal">Click Save Changes.</li>
                    </ol>
                    <div className="ml-auto mt-20 flex justify-end gap-3">
                        <Button onClick={back} variant="secondary" className="">
                            Back
                        </Button>

                        <Button className="" onClick={next}>
                            <ArrowRightIcon className="mr-3 h-4 w-4" />
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
