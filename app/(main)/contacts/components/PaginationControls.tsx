import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type PaginationTextType = number | string;

// This function controls the ellipses placement of PaginationControls
// See https://stackoverflow.com/a/70263913
function pagination({
    page,
    numPages,
}: {
    page: number;
    numPages: number;
}): PaginationTextType[] {
    const range = (lo: number, hi: number): number[] =>
        Array.from({ length: hi - lo }, (_, i) => i + lo);
    const numButtons = 6;
    const ellipsis = "...";

    const start = Math.max(
        1,
        Math.min(
            page - Math.floor((numButtons - 3) / 2),
            numPages - numButtons + 2,
        ),
    );
    const end = Math.min(
        numPages,
        Math.max(page + Math.floor((numButtons - 2) / 2), numButtons - 1),
    );
    return [
        ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
        ...range(start, end + 1),
        ...(end < numPages - 1
            ? [ellipsis, numPages]
            : end < numPages
              ? [numPages]
              : []),
    ];
}

// This is the pagination number button (not prev/next buttons)
function PaginationNumberButton({
    text,
    currentPage,
}: {
    text: PaginationTextType;
    currentPage: number;
}) {
    if (text === "...") {
        return (
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
            </span>
        );
    }
    if (text === currentPage) {
        return (
            <Link
                href={{
                    pathname: `/contacts`,
                    query: { page: text },
                }}
                aria-current="page"
                className="bg-foreground relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {text}
            </Link>
        );
    }
    return (
        <Link
            href={{
                pathname: `/contacts`,
                query: { page: text },
            }}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
            {text}
        </Link>
    );
}

function PaginationDescription({
    from,
    to,
    total,
}: {
    from: number;
    to: number;
    total: number;
}) {
    const end = to <= total ? to : total;
    let start = from > 1 ? from + 1 : 1; // from is zero indexed
    if (total === 0) start = 0;
    return (
        <div>
            <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{start}</span> to{" "}
                <span className="font-medium">{end}</span> of{" "}
                <span className="font-medium">{total}</span> results
            </p>
        </div>
    );
}

export default function PaginationControls({
    limit = 10,
    page = 1,
    total = 10,
    from = 1,
    to = 10,
}: {
    limit: number;
    page: number;
    total: number;
    from: number;
    to: number;
}) {
    const numPages = Math.ceil(total / limit);
    const pages = pagination({ page, numPages });

    return (
        <div className="flex items-center justify-between bg-white px-4 sm:px-6 ">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={{
                        pathname: `/contacts`,
                        query: { page: page > 1 ? page - 1 : 1 },
                    }}
                    className={cn(
                        "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50",
                        page <= 1 && "pointer-events-none opacity-50",
                    )}
                >
                    Previous
                </Link>
                <Link
                    href={{
                        pathname: `/contacts`,
                        query: { page: page < numPages ? page + 1 : numPages },
                    }}
                    className={cn(
                        "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50",
                        page >= numPages && "pointer-events-none opacity-50",
                    )}
                >
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <PaginationDescription from={from} to={to} total={total} />
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <Link
                            href={{
                                pathname: `/contacts`,
                                query: { page: page > 1 ? page - 1 : 1 },
                            }}
                            className={cn(
                                "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
                                page <= 1 && "pointer-events-none opacity-50",
                            )}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </Link>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {pages.map((text, index) => (
                            <PaginationNumberButton
                                key={index}
                                text={text}
                                currentPage={page}
                            />
                        ))}
                        <Link
                            href={{
                                pathname: `/contacts`,
                                query: {
                                    page: page < numPages ? page + 1 : numPages,
                                },
                            }}
                            className={cn(
                                "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
                                page >= numPages &&
                                    "pointer-events-none opacity-50",
                            )}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
