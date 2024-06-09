'use client'
import { SubmitFormButton } from '@/components/SubmitFormButton'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { login } from '@/lib/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const LoginSchema = z.object({
    username: z.string().min(1, 'Username cannot be blank'),
    password: z.string().min(1, 'Password cannot be blank'),
})

export default function LoginForm() {
    const [error, setError] = useState('')
    const router = useRouter()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })
    async function onSubmit(values: z.infer<typeof LoginSchema>) {
        setError('')

        try {
            await login(values.username, values.password)
            router.push('/')
        } catch (error) {
            setError('Incorrect username or password, please try again.')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
                </CardContent>
                <CardFooter>
                    <SubmitFormButton className="w-full">Sign in</SubmitFormButton>
                </CardFooter>
            </form>
        </Form>
    )
}
