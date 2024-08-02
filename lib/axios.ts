import axios from 'axios'
import { cookies } from 'next/headers'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export function AuthenticatedHttpClient() {
    const cookieStore = cookies()
    const sessionId = cookieStore.get('sessionId')
    const csrfToken = cookieStore.get('csrfToken')

    if (!sessionId || !csrfToken) {
        throw new Error('Not authenticated')
    }

    return axios.create({
        baseURL: `${apiUrl}/`,
        timeout: 5000,
        signal: AbortSignal.timeout(5000),
        headers: {
            'Content-Type': 'application/json',
            Cookie: `csrftoken=${csrfToken.value}; superuser_sessionid=${sessionId.value}`,
            credentials: 'include',
        },
    })
}

export function AnonHttpClient() {
    return axios.create({
        baseURL: `${apiUrl}/`,
        timeout: 1000,
        headers: { 'Content-Type': 'application/json' },
    })
}
