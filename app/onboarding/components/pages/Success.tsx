import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useConfetti } from '../../hooks/useConfetti'
import { useCountdown } from '../../hooks/useCountdown'

export function Success() {
    const router = useRouter()
    const { countdown } = useCountdown()
    useConfetti()

    if (countdown <= 0) {
        router.push('/')
    }
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center">
            <h3 className="text-2xl font-semibold md:text-5xl">You're all set!</h3>
            <p className="max-w-xl text-muted-foreground">
                Your email account is now set up to send messages through Follow Up! Next steps: create your first email
                template, add contacts to your campaign, and watch your interview opportunities roll in!
            </p>
            <p>You will be redirected to your dashboard in {countdown}...</p>
            <div className="mt-8">
                <Button>
                    <Link href="/">Go to your dashboard</Link>
                </Button>
            </div>
        </div>
    )
}
