'use client'

const numPages = 3

export default function NavigationIndicator({ navigationState }: { navigationState: number }) {
    return (
        <div className="py-12">
            <div className="flex items-center gap-12">
                {new Array(numPages).fill(0).map((zero, index) => {
                    if (index === navigationState)
                        return <div key={index} className="h-3 w-3 rounded-full border border-black bg-zinc-700" />
                    if (index < navigationState)
                        return <div key={index} className="h-3 w-3 rounded-full border border-zinc-700 bg-zinc-700" />

                    return <div key={index} className="h-3 w-3 rounded-full border border-black bg-white" />
                })}
            </div>
        </div>
    )
}
