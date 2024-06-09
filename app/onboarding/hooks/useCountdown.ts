import { useEffect, useState } from 'react'

interface Countdown {
    countdown: number
}
export function useCountdown(): Countdown {
    const [countdown, setCountdown] = useState(10)

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 0) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return {
        countdown: countdown,
    }
}
