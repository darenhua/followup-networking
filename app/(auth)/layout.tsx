export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-semibold">Follow Up Networking</h1>
            <p className="text-foreground-muted">Don't have an account? Reach out to Follow Up to get started.</p>
            {children}
        </div>
    )
}
