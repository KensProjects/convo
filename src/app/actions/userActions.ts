import { api } from "@/trpc/server"

export default async function userActions({ username, id }: { id?: string, username?: string }) {
    'use server'
    const getProfileAction = api.user.getProfile.useQuery({ username, id })

    return { getProfileAction }
} 