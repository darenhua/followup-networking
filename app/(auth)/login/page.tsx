import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from './components/LoginForm'

export default async function Page() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Please enter your login credentials.</CardDescription>
            </CardHeader>

            <LoginForm />
        </Card>
    )
}
