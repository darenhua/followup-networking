import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <ArrowPathIcon className="h-4 w-4 animate-spin" />
        </div>
    )
}
