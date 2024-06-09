'use client'

import { cn } from '@/lib/utils'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useFormState } from 'react-hook-form'
import { Button } from './ui/button'

interface SubmitFormButton {
    children: React.ReactNode
    icon?: React.ReactElement
    className?: string
    requireValidForm?: boolean
    isPendingOverride?: boolean
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function SubmitFormButton({
    className,
    variant,
    children,
    requireValidForm,
    icon,
    isPendingOverride,
}: SubmitFormButton) {
    const { isSubmitting } = useFormState()
    const { isValid, isDirty } = useFormState()
    const valid = (isValid && isDirty) || !requireValidForm
    const isPending = isPendingOverride ?? isSubmitting

    return (
        <Button
            type="submit"
            className={cn(className)}
            disabled={isPending || (requireValidForm && !valid)}
            variant={variant}
            aria-disabled={isPending}
        >
            {!isPending && icon}
            {isPending && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    )
}
