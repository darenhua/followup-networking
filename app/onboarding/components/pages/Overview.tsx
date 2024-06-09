'use client'

import { Button } from '@/components/ui/button'

export default function Overview({ next }: { next: () => void }) {
    return (
        <div className="mx-auto mt-6 flex h-[98%] w-96 flex-col items-center justify-center rounded-lg border px-8 py-20 text-center shadow-sm">
            <div className="animate-slide-in opacity-0">
                <div className="mb-8 max-w-72">
                    <h3 className="text-xl font-semibold md:text-3xl">Welcome to Follow Up Networking!</h3>
                    <p className="mt-6 text-sm text-muted-foreground">
                        Let's get you started in your Follow Up journey! First, we'll need to get your email account set
                        up to be able to integrate with Follow Up's servers.
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                        This process will take <span className="font-semibold">less than 5 minutes</span>.
                    </p>
                </div>
                <div className="mt-6">
                    <Button onClick={next} className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Let's go
                    </Button>
                </div>
            </div>
        </div>
    )
}
