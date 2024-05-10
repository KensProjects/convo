'use client'

import { api } from "@/trpc/react"

export default function userFetch(id: string) {

    const { data: personalData } = api.user.getProfile.useQuery({ id: id })

    return { personalData }
}
