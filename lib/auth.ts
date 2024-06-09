'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const LoginSchema = z.object({
    username: z.string().min(1, 'Username cannot be blank'),
    password: z.string().min(1, 'Password cannot be blank'),
})

export interface UserType {
    id: number
    user: number
    first_name: string
    last_name: string
    email: string
    app_password: string
    second_email: string
    second_app_password: string
    third_email: string
    third_app_password: string
}

export const login = async (username: string, password: string) => {
    let redirectPath: string | null = null

    try {
        const validation = LoginSchema.safeParse({
            username,
            password,
        })

        if (!validation.success) {
            throw new Error('Validation error')
        }

        const response = await fetch(`${apiUrl}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error('Incorrect username or password', data)
        }
        const expiry = new Date(data.expiry)
        const loginCookies = response.headers.getSetCookie()

        loginCookies.forEach((cookie) => {
            let splittedPair = cookie.split('=')
            const key = decodeURIComponent(splittedPair[0].trim())
            const value = decodeURIComponent(splittedPair[1].trim())
            if (key === 'superuser_sessionid') {
                cookies().set('sessionId', value, { expires: expiry })
            } else if (key === 'csrftoken') {
                cookies().set('csrfToken', value, { expires: expiry })
            }
        })
        redirectPath = '/'
    } catch (error) {
        redirectPath = null
        console.error(error)
        throw new Error(error as string)
    } finally {
        if (redirectPath) redirect(redirectPath)
    }
}

const getUser = async (): Promise<UserType> => {
    try {
        const cookieStore = cookies()
        const sessionId = cookieStore.get('sessionId')
        const csrfToken = cookieStore.get('csrfToken')

        if (!sessionId || !csrfToken) {
            throw new Error('Not authenticated')
        }

        const response = await fetch(`${apiUrl}/`, {
            credentials: 'include',
            headers: {
                Cookie: `csrftoken=${csrfToken.value}; superuser_sessionid=${sessionId.value}`,
            },
        })
        const user = await response.json()

        if (!response.ok) {
            throw new Error('Unable to get user')
        }
        return user
    } catch (error) {
        console.error(error)
        throw new Error(error as string)
    }
}

export const getUserOrRedirect = async (): Promise<UserType> => {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error()
        }
        return user
    } catch (error) {
        redirect('/login')
    }
}

export const logout = async (): Promise<void> => {
    let redirectPath: string | null = null
    try {
        // TODO once logout route works, this should be after throw error
        redirectPath = '/login'

        const response = await fetch(`${apiUrl}/logout/`, {})
        if (!response.ok) {
            throw new Error('Logout failed')
        }
    } catch (error) {
        console.error(error)
    } finally {
        cookies().delete('sessionId')
        cookies().delete('csrfToken')
        if (redirectPath) redirect(redirectPath)
    }
}
