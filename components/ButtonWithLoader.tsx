'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { HookActionStatus } from 'next-safe-action/hooks'

interface ActionProps<P> {
    execute: (input: P) => void
    status: HookActionStatus
}

interface ButtonWithLoaderProps<P, R> {
    action: ActionProps<P>
    disabled?: boolean
    params: P
    children: React.ReactNode
    icon?: React.ReactElement
    className?: string
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export const ButtonWithLoader = <P, R>({
    action,
    disabled,
    params,
    children,
    icon,
    className,
    variant,
}: ButtonWithLoaderProps<P, R>) => {
    const isActionExecuting = action.status === 'executing'
    const isButtonDisabled = disabled ? disabled || isActionExecuting : isActionExecuting

    return (
        <Button
            type="button"
            className={cn(className)}
            disabled={isButtonDisabled}
            onClick={async () => {
                action.execute(params)
            }}
            variant={variant}
        >
            {!isActionExecuting && icon}
            {isActionExecuting && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    )
}
