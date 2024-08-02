import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function CtaCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upgrade to Follow Up Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="mailto:dhua@hamilton.edu">
                    <Button size="sm" className="w-full">
                        Upgrade
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}
