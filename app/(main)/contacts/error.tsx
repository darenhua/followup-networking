'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Error() {
    const router = useRouter()
    return (
        <section className="flex flex-1 flex-col justify-center bg-white dark:bg-gray-900">
            <div className="container mx-auto flex flex-col justify-center px-6">
                <div>
                    <p className="text-sm font-medium text-blue-500 dark:text-blue-400">Server error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                        We ran into a problem
                    </h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Please check your connection or contact Follow Up support for help!
                    </p>

                    <div className="mt-6 flex items-center gap-x-3">
                        <Button
                            onClick={router.back}
                            className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
                        >
                            <span>Go back</span>
                        </Button>

                        <Link href="/">
                            <Button className="hover:bg-primary-hover w-1/2 shrink-0 rounded-lg bg-primary px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto">
                                Take me home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
