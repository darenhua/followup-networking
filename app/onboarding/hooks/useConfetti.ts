import JSConfetti from 'js-confetti'
import { useEffect } from 'react'

export function useConfetti() {
    useEffect(() => {
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti()

        return () => {
            jsConfetti.clearCanvas()
        }
    }, [])
}
